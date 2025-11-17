"use client";

import { CatalogProps } from "@/types/catalog";
import { useEffect, useState } from "react";
import GridCategoryBlock from "../GridCategoryBlock";
import Loading from "./Loading";
import styles from "./CatalogPage.module.css";

export const metadata = {
	title: 'Каталог товаров магазина "Северяночка"',
	description: 'Каталог всех товаров магазина "Северяночка"',
};

const CatalogPage = () => {
	const [categories, setCategories] = useState<CatalogProps[]>([]);
	const [isEditing, setIsEditing] = useState(false);
	const [draggedCategory, setDraggedCategory] = useState<CatalogProps | null>(
		null
	);
	const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(
		null
	);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const isAdmin = true;

	const fetchCategories = async () => {
		try {
			const response = await fetch("api/catalog");
			if (!response.ok)
				throw new Error(`Ошибка ответа сервера: ${response.status}`);

			const data: CatalogProps[] = await response.json();
			setCategories(data.sort((a, b) => a.order - b.order));
		} catch (error) {
			console.error("Не удалось получить категории:", error);
			setError("Не удалось получить категории");
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchCategories();
	}, []);

	const updateOrderInDB = async () => {
		try {
			setIsLoading(true);
			const response = await fetch("api/catalog", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(
					categories.map((category, index) => ({
						_id: category._id,
						order: index + 1,
						title: category.title,
						img: category.img,
						colSpan: category.colSpan,
						tabletColSpan: category.tabletColSpan,
						mobileColSpan: category.mobileColSpan,
					}))
				),
			});

			if (!response.ok) throw new Error("Ошибка при обновлении порядка");

			const result = await response.json();

			if (result.success) {
				console.log("Порядок спешно обновлен в БД");
			}
		} catch (error) {
			console.error("Ошибка при сохранении порядка:", error);
			setError("Ошибка при сохранении порядка");
		} finally {
			setIsLoading(false);
		}
	};

	const handleToggleEditing = async () => {
		if (isEditing) {
			await updateOrderInDB();
		}
		setIsEditing(!isEditing);
	};

	const handleDragStart = (category: CatalogProps) => {
		if (isEditing) {
			setDraggedCategory(category);
		}
	};

	const handleDragOver = (e: React.DragEvent, categoryId: string) => {
		e.preventDefault();
		if (draggedCategory && draggedCategory._id !== categoryId) {
			setHoveredCategoryId(categoryId);
		}
	};

	const handleDragLeave = () => {
		setHoveredCategoryId(null);
	};

	const handleDrop = (e: React.DragEvent, targetCategoryId: string) => {
		e.preventDefault();

		if (!isEditing || !draggedCategory) return;

		setCategories((prevCategories) => {
			const draggedIndex = prevCategories.findIndex(
				(c) => c._id === draggedCategory._id
			);

			const targetIndex = prevCategories.findIndex(
				(c) => c._id === targetCategoryId
			);

			if (draggedIndex === -1 || targetIndex === -1) return prevCategories;

			const newCategories = [...prevCategories];

			const draggedItem = newCategories[draggedIndex];
			const targetItem = newCategories[targetIndex];

			const targetSizes = {
				mobileColSpan: targetItem.mobileColSpan,
				tabletColSpan: targetItem.tabletColSpan,
				colSpan: targetItem.colSpan,
			};

			const draggedSizes = {
				mobileColSpan: draggedItem.mobileColSpan,
				tabletColSpan: draggedItem.tabletColSpan,
				colSpan: draggedItem.colSpan,
			};

			newCategories[targetIndex] = {
				...draggedItem,
				...targetSizes,
			};

			newCategories[draggedIndex] = {
				...targetItem,
				...draggedSizes,
			};

			return newCategories;
		});

		setDraggedCategory(null);
		setHoveredCategoryId(null);
	};

	const resetLayout = () => {
		fetchCategories();
	};

	const getCategoryClasses = (category: CatalogProps) => {
		const classes = [styles.categoryItem];

		if (isEditing) {
			classes.push(styles.categoryItemEditing);
		}

		if (hoveredCategoryId === category._id) {
			classes.push(styles.categoryItemHovered);
		}

		if (category.mobileColSpan === "col-span-2") {
			classes.push(styles.mobileColSpan2);
		}

		if (category.tabletColSpan === "md:col-span-1") {
			classes.push(styles.tabletColSpan1);
		} else if (category.tabletColSpan === "md:col-span-2") {
			classes.push(styles.tabletColSpan2);
		}

		if (category.colSpan === "col-span-2") {
			classes.push(styles.colSpan2);
		} else if (category.colSpan === "xl:col-span-2") {
			classes.push(styles.desktopColSpan2);
		}

		return classes.join(" ");
	};

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		throw error;
	}

	if (!categories.length) {
		return <div className={styles.notFound}>Категорий каталога не найдено</div>;
	}

	return (
		<section className={styles.catalogPage}>
			{isAdmin && (
				<div className={styles.adminControls}>
					<button onClick={handleToggleEditing} className={styles.editButton}>
						{isEditing ? "Закончить редактирование" : "Изменить расположение"}
					</button>
					{isEditing && (
						<button onClick={resetLayout} className={styles.resetButton}>
							Сбросить
						</button>
					)}
				</div>
			)}
			<h1 className={styles.catalogTitle}>Каталог</h1>
			<div className={styles.categoriesGrid}>
				{categories.map((category) => (
					<div
						key={category._id}
						className={getCategoryClasses(category)}
						onDragOver={(e) => handleDragOver(e, category._id)}
						onDragLeave={handleDragLeave}
						onDrop={(e) => handleDrop(e, category._id)}
					>
						<div
							className={`${styles.categoryContent} ${
								draggedCategory?._id === category._id
									? styles.categoryContentDragging
									: ""
							}`}
							draggable={isEditing}
							onDragStart={() => handleDragStart(category)}
						>
							<GridCategoryBlock
								id={category.id}
								title={category.title}
								img={category.img}
							/>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default CatalogPage;

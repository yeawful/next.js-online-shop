"use client";

import MiniLoader from "@/components/loaders/MiniLoader";
import { useState, useEffect } from "react";
import styles from "./Categories.module.css";

interface Category {
	_id: string;
	title: string;
	slug: string;
}

interface CategoriesProps {
	selectedCategories: string[];
	onCategoriesChange: (categories: string[]) => void;
}

const Categories = ({
	selectedCategories,
	onCategoriesChange,
}: CategoriesProps) => {
	const [categories, setCategories] = useState<Category[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCategories = async () => {
			try {
				const response = await fetch("/api/catalog");
				if (!response.ok) {
					throw new Error("Ошибка загрузки категорий");
				}
				const data = await response.json();
				setCategories(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : "Неизвестная ошибка");
			} finally {
				setLoading(false);
			}
		};

		fetchCategories();
	}, []);

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedOptions = Array.from(e.target.selectedOptions);
		const selectedSlugs = selectedOptions.map((option) => option.value);
		onCategoriesChange(selectedSlugs);
	};

	if (loading) {
		return <MiniLoader />;
	}

	if (error) {
		return (
			<div className={styles.container}>
				<label className={styles.label}>
					Категории <span className={styles.required}>*</span>
				</label>
				<div className={styles.error}>Ошибка: {error}</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<label className={styles.label}>
				Категории <span className={styles.required}>*</span>
			</label>
			<select
				multiple
				value={selectedCategories}
				onChange={handleCategoryChange}
				className={styles.select}
				required
			>
				{categories.map((category) => (
					<option key={category._id} value={category.slug}>
						{category.title}
					</option>
				))}
			</select>
			<div className={styles.hint}>
				Для выбора нескольких категорий удерживайте Ctrl (Cmd на Mac)
			</div>
			{selectedCategories.length > 0 && (
				<div className={styles.selectedInfo}>
					<span className={styles.selectedCount}>Выбранные категории: </span>
					<span className={styles.selectedNumber}>
						{selectedCategories.length} шт.
					</span>
				</div>
			)}
		</div>
	);
};

export default Categories;

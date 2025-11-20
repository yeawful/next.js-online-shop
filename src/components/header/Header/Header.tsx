"use client";

import UserBlock from "../UserBlock/UserBlock";
import LogoBlock from "../LogoBlock/LogoBlock";
import SearchBlock from "../SearchBlock/SearchBlock";
import { useState, useRef } from "react";
import Link from "next/link";
import { Category } from "@/types/categories";
import styles from "./Header.module.css";

const Header = () => {
	const [isCatalogOpen, setIsCatalogOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [categories, setCategories] = useState<Category[]>([]);
	const [isSearchFocused, setIsSearchFocused] = useState(false);
	const searchBlockRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	const fetchCategories = async () => {
		if (categories.length > 0) return;
		try {
			const response = await fetch("/api/catalog");
			const data = await response.json();
			setCategories(data);
		} catch (error) {
			console.error("Ошибка загрузки категорий:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const openMenu = () => {
		if (!isSearchFocused) {
			setIsCatalogOpen(true);
			fetchCategories();
		}
	};

	const handleMouseMove = (e: React.MouseEvent) => {
		if (!searchBlockRef.current || !isCatalogOpen || isSearchFocused) return;

		const isInsideMenu = menuRef.current?.contains(e.target as Node);
		if (isInsideMenu) return;

		const searchBlockRect = searchBlockRef.current.getBoundingClientRect();

		if (e.clientX < searchBlockRect.left || e.clientX > searchBlockRect.right) {
			setIsCatalogOpen(false);
		}
	};

	const handleSearchFocusAction = (focused: boolean) => {
		setIsSearchFocused(focused);
		if (focused) {
			setIsCatalogOpen(false);
		}
	};

	return (
		<header
			className={styles.header}
			onMouseLeave={() => setIsCatalogOpen(false)}
			onMouseMove={handleMouseMove}
		>
			<div className={styles.headerTop}>
				<LogoBlock />
				<div
					className={styles.searchContainer}
					onMouseEnter={openMenu}
					ref={searchBlockRef}
				>
					<SearchBlock onFocusChangeAction={handleSearchFocusAction} />
				</div>
			</div>

			{isCatalogOpen && (
				<div ref={menuRef} className={styles.catalogMenu}>
					<div className={styles.catalogMenuContent}>
						{isLoading ? (
							<div className={styles.loadingText}>Загрузка...</div>
						) : categories.length > 0 ? (
							<div className={styles.categoriesGrid}>
								{categories.map((category) => (
									<Link
										key={category.id}
										href={`/category/${category.id}`}
										className={styles.categoryLink}
										onClick={() => setIsCatalogOpen(false)}
									>
										{category.title}
									</Link>
								))}
							</div>
						) : (
							<div className={styles.noCategoriesText}>
								Нет доступных категорий
							</div>
						)}
					</div>
				</div>
			)}

			<UserBlock />
		</header>
	);
};

export default Header;

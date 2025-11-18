"use client";

import Image from "next/image";
import iconSearch from "/public/icons-header/icon-search.svg";
import Link from "next/link";
import iconBurger from "/public/icons-header/icon-burger-menu.svg";
import { useEffect, useRef, useState } from "react";
import { SearchProduct } from "@/types/searchProduct";
import { TRANSLATIONS } from "../../../utils/translations";
import HighlightText from "../HighlightText/HighlightText";
import styles from "./InputBlock.module.css";

const InputBlock = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [groupedProducts, setGroupedProducts] = useState<
		{ category: string; products: SearchProduct[] }[]
	>([]);
	const searchRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);

		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	useEffect(() => {
		const fetchSearchData = async () => {
			if (query.length > 1) {
				try {
					setIsLoading(true);
					const response = await fetch(`/api/search?query=${query}`);
					const data = await response.json();
					console.log(data);
					setGroupedProducts(data);
				} catch (error) {
					console.error("Не найден продукт или категория", error);
				} finally {
					setIsLoading(false);
				}
			} else {
				setGroupedProducts([]);
			}
		};
		const debounceTimer = setTimeout(fetchSearchData, 300);
		return () => clearTimeout(debounceTimer);
	}, [query]);

	const handleInputFocus = () => {
		setIsOpen(true);
	};

	const resetSearch = () => {
		setIsOpen(false);
		setQuery("");
	};

	return (
		<div className={styles.inputBlock} ref={searchRef}>
			<div className={styles.searchContainer}>
				<input
					type="text"
					value={query}
					placeholder="Найти товар"
					className={styles.searchInput}
					onFocus={handleInputFocus}
					onChange={(e) => setQuery(e.target.value)}
				/>

				<Image
					src={iconSearch}
					alt="Поиск"
					width={24}
					height={24}
					className={styles.searchIcon}
				/>
			</div>

			{isOpen && (
				<div className={styles.searchDropdown}>
					{isLoading ? (
						<div className={styles.loading}>Поиск...</div>
					) : groupedProducts.length > 0 ? (
						<div className={styles.searchContent}>
							{groupedProducts.map((group) => (
								<div key={group.category} className={styles.categoryGroup}>
									<Link
										href={`/category/${encodeURIComponent(group.category)}`}
										className={styles.categoryLink}
										onClick={resetSearch}
									>
										<div>
											<HighlightText
												text={TRANSLATIONS[group.category] || group.category}
												highlight={query}
											/>
										</div>
										<Image
											src={iconBurger}
											alt={TRANSLATIONS[group.category] || group.category}
											width={24}
											height={24}
										/>
									</Link>
									<ul className={styles.productsList}>
										{group.products.map((product) => (
											<li key={product.id} className={styles.productItem}>
												<Link
													href={`/product/${product.id}`}
													className={styles.productLink}
													onClick={resetSearch}
												>
													<HighlightText
														text={product.title}
														highlight={query}
													/>
												</Link>
											</li>
										))}
									</ul>
								</div>
							))}
						</div>
					) : query.length > 1 ? (
						<div className={styles.noResults}>Ничего не найдено</div>
					) : (
						<div className={styles.searchPrompt}>
							Введите 2 и более символов для поиска
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default InputBlock;

"use client";

import { Loader } from "@/components/loader/Loader";
import ProductsSection from "@/components/products/ProductsSection/ProductsSection";
import { ProductCardProps } from "@/types/product";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const SearchResult = () => {
	const searchParams = useSearchParams();
	const query = searchParams.get("q") || "";
	const [products, setProducts] = useState<ProductCardProps[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchSearchResults = async () => {
			try {
				setIsLoading(true);
				const response = await fetch(
					`/api/search-full?query=${encodeURIComponent(query)}`
				);

				const data = await response.json();
				setProducts(data);
			} catch (error) {
				console.error("Не удалось получить результаты", error);
			} finally {
				setIsLoading(false);
			}
		};

		if (query) {
			fetchSearchResults();
		}
	}, [query]);

	if (isLoading) return <Loader />;

	return (
		<div className={styles.searchResult}>
			<h1 className={styles.searchTitle}>Результат поиска</h1>
			<p className={styles.searchQuery}>
				по запросу <span className={styles.highlightedQuery}>{query}</span>
			</p>
			{products.length === 0 ? (
				<p className={styles.noResults}>По Вашему запросу ничего не найдено</p>
			) : (
				<ProductsSection
					title={""}
					products={products}
					applyIndexStyles={false}
				/>
			)}
		</div>
	);
};

export default SearchResult;

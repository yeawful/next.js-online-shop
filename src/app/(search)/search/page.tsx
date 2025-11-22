"use client";

import ErrorComponent from "@/components/error/ErrorComponent";
import { Loader } from "@/components/loaders/Loader";
import ProductsSection from "@/components/products/ProductsSection/ProductsSection";
import { ProductCardProps } from "@/types/product";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import styles from "./page.module.css";

const SearchPage = () => {
	return (
		<Suspense fallback={<Loader />}>
			<SearchResult />
		</Suspense>
	);
};

const SearchResult = () => {
	const searchParams = useSearchParams();
	const query = searchParams.get("q") || "";
	const [products, setProducts] = useState<ProductCardProps[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<{
		error: Error;
		userMessage: string;
	} | null>(null);

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
				setError({
					error:
						error instanceof Error ? error : new Error("Неизвестная ошибка"),
					userMessage: "Не удалось загрузить результаты поиска",
				});
			} finally {
				setIsLoading(false);
			}
		};

		if (query) {
			fetchSearchResults();
		}
	}, [query]);

	if (isLoading) return <Loader />;

	if (error) {
		return (
			<ErrorComponent error={error.error} userMessage={error.userMessage} />
		);
	}

	return (
		<div className={styles.searchPage}>
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

export default SearchPage;

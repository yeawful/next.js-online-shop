"use client";

import Link from "next/link";
import Image from "next/image";
import { FilterControlsProps } from "@/types/filterControlsProps";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import styles from "./FilterControls.module.css";

function FilterControlsContent({ basePath }: FilterControlsProps) {
	const searchParams = useSearchParams();

	const minPrice = searchParams.get("priceFrom");
	const maxPrice = searchParams.get("priceTo");
	const activeFilter = searchParams.getAll("filter");

	function buildClearFiltersLink() {
		const params = new URLSearchParams();

		if (searchParams.get("page")) {
			params.set("page", searchParams.get("page") || "");
		}

		if (searchParams.get("itemsPerPage")) {
			params.set("itemsPerPage", searchParams.get("itemsPerPage") || "");
		}

		params.delete("filter");
		params.delete("priceFrom");
		params.delete("priceTo");

		return `${basePath}?${params.toString()}`;
	}

	const hasPriceFilter = minPrice || maxPrice;

	const buildClearPriceFilterLink = () => {
		const params = new URLSearchParams(searchParams.toString());
		params.delete("priceFrom");
		params.delete("priceTo");

		return `${basePath}?${params.toString()}`;
	};

	const activeFilterCount =
		(activeFilter
			? Array.isArray(activeFilter)
				? activeFilter.length
				: 1
			: 0) + (hasPriceFilter ? 1 : 0);

	const filterButtonText =
		activeFilterCount === 0
			? "Фильтры"
			: activeFilterCount === 1
				? "Фильтр 1"
				: `Фильтры ${activeFilterCount}`;

	const getFilterButtonClass = () => {
		const baseClass = styles.filterButton;
		const stateClass =
			(activeFilter && activeFilter.length > 0) || hasPriceFilter
				? styles.filterButtonActive
				: styles.filterButtonInactive;
		return `${baseClass} ${stateClass}`;
	};

	return (
		<div className={styles.container}>
			<div className={getFilterButtonClass()}>{filterButtonText}</div>
			{hasPriceFilter && (
				<div className={styles.filterTag}>
					<Link
						href={buildClearPriceFilterLink()}
						className={styles.filterLink}
					>
						Цена {minPrice !== null ? `от ${minPrice}` : ""}{" "}
						{maxPrice !== null ? `до ${maxPrice}` : ""}
						<Image
							src="/icons-products/icon-closer.svg"
							alt="Очистить фильтр по цене"
							width={24}
							height={24}
							className={styles.clearIcon}
						/>
					</Link>
				</div>
			)}
			{activeFilterCount > 0 && (
				<div className={styles.filterTag}>
					<Link href={buildClearFiltersLink()} className={styles.filterLink}>
						Очистить фильтры
						<Image
							src="/icons-products/icon-closer.svg"
							alt="Очистить фильтры"
							width={24}
							height={24}
							className={styles.clearIcon}
						/>
					</Link>
				</div>
			)}
		</div>
	);
}

const FilterControls = ({ basePath }: FilterControlsProps) => {
	return (
		<Suspense
			fallback={
				<div className={styles.skeletonContainer}>
					<div className={styles.skeletonFilter}>Фильтры</div>
				</div>
			}
		>
			<FilterControlsContent basePath={basePath} />
		</Suspense>
	);
};

export default FilterControls;

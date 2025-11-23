"use client";

import Link from "next/link";
import Image from "next/image";
import { FilterControlsProps } from "@/types/filterControlsProps";
import { useSearchParams } from "next/navigation";
import styles from "./FilterControls.module.css";

const FilterControls = ({ basePath }: FilterControlsProps) => {
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

	const isActive = (activeFilter && activeFilter.length > 0) || hasPriceFilter;
	const buttonClass = isActive
		? styles.filterButtonActive
		: styles.filterButtonInactive;

	return (
		<div className={styles.filterControls}>
			<div className={`${styles.filterButton} ${buttonClass}`}>
				{filterButtonText}
			</div>
			{hasPriceFilter && (
				<div className={styles.priceFilterButton}>
					<Link
						href={buildClearPriceFilterLink()}
						className={styles.clearFilterLink}
					>
						Цена {minPrice !== null ? `от ${minPrice}` : ""}{" "}
						{maxPrice !== null ? `до ${maxPrice}` : ""}
						<Image
							src="/icons-products/icon-closer.svg"
							alt="Очистить фильтр по цене"
							width={24}
							height={24}
							className={styles.filterIcon}
						/>
					</Link>
				</div>
			)}
			{activeFilterCount > 0 && (
				<div className={styles.priceFilterButton}>
					<Link
						href={buildClearFiltersLink()}
						className={styles.clearFilterLink}
					>
						Очистить фильтры
						<Image
							src="/icons-products/icon-closer.svg"
							alt="Очистить фильтры"
							width={24}
							height={24}
							className={styles.filterIcon}
						/>
					</Link>
				</div>
			)}
		</div>
	);
};

export default FilterControls;

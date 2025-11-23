"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "./FilterButtons.module.css";

const FILTERS = [
	{ key: "our-production", label: "Товары нашего производства" },
	{ key: "healthy-food", label: "Полезное питание" },
	{ key: "non-gmo", label: "Без ГМО" },
];

const FilterButtons = ({ basePath }: { basePath: string }) => {
	const searchParams = useSearchParams();
	const currentFilters = searchParams.getAll("filter");

	const buildFilterLink = (filterKey: string) => {
		const params = new URLSearchParams(searchParams.toString());

		if (currentFilters.includes(filterKey)) {
			params.delete("filter");
			currentFilters
				.filter((f) => f !== filterKey)
				.forEach((f) => params.append("filter", f));
		} else {
			params.append("filter", filterKey);
		}

		params.delete("page");

		return `${basePath}?${params.toString()}`;
	};

	const isFilterActive = (filterKey: string) =>
		currentFilters.includes(filterKey);

	return (
		<div className={styles.filterButtons}>
			{FILTERS.map((filter) => (
				<Link
					key={filter.key}
					href={buildFilterLink(filter.key)}
					className={`${styles.filterButton} ${
						isFilterActive(filter.key)
							? styles.filterButtonActive
							: styles.filterButtonInactive
					}`}
				>
					{filter.label}
				</Link>
			))}
		</div>
	);
};

export default FilterButtons;

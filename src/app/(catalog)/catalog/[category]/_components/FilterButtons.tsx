"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import styles from "./FilterButtons.module.css";

const FILTERS = [
	{ key: "our-production", label: "Товары нашего производства" },
	{ key: "healthy-food", label: "Полезное питание" },
	{ key: "non-gmo", label: "Без ГМО" },
];

function FilterButtonsContent({ basePath }: { basePath: string }) {
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

	const getFilterClass = (filterKey: string) => {
		return isFilterActive(filterKey)
			? `${styles.filterLink} ${styles.filterLinkActive}`
			: `${styles.filterLink} ${styles.filterLinkInactive}`;
	};

	return (
		<div className={styles.container}>
			{FILTERS.map((filter) => (
				<Link
					key={filter.key}
					href={buildFilterLink(filter.key)}
					className={getFilterClass(filter.key)}
				>
					{filter.label}
				</Link>
			))}
		</div>
	);
}

const FilterButtons = ({ basePath }: { basePath: string }) => {
	return (
		<Suspense
			fallback={
				<div className={styles.skeletonContainer}>
					{FILTERS.map((filter) => (
						<div key={filter.key} className={styles.skeletonFilter}>
							{filter.label}
						</div>
					))}
				</div>
			}
		>
			<FilterButtonsContent basePath={basePath} />
		</Suspense>
	);
};

export default FilterButtons;

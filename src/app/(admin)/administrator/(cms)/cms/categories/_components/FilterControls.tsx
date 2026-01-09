import { Filter, X } from "lucide-react";
import { useCategoryStore } from "@/store/categoryStore";
import { useState } from "react";
import { FilterControlsProps } from "../../types";
import styles from "./FilterControls.module.css";

export const FilterControls = ({ onToggleFilters }: FilterControlsProps) => {
	const {
		filterType,
		sortField,
		sortDirection,
		searchQuery,
		setFilterType,
		setSortField,
		setSortDirection,
		handleSearchChange,
		loadCategories,
	} = useCategoryStore();

	const [localShowFilters, setLocalShowFilters] = useState(false);

	const hasActiveFilters = Boolean(
		filterType !== "all" ||
		sortField !== "numericId" ||
		sortDirection !== "asc" ||
		searchQuery !== ""
	);

	const resetFilters = () => {
		handleSearchChange("");
		setFilterType("all");
		setSortField("numericId");
		setSortDirection("asc");
		loadCategories({ page: 1, search: "" });
	};

	const handleToggleFilters = () => {
		const newValue = !localShowFilters;
		setLocalShowFilters(newValue);
		if (onToggleFilters) {
			onToggleFilters(newValue);
		}
	};

	return (
		<div className={styles.controlsContainer}>
			<button
				onClick={handleToggleFilters}
				className={`${styles.filterButton} ${
					localShowFilters ? styles.filterButtonActive : ""
				}`}
				title={localShowFilters ? "Скрыть фильтры" : "Показать фильтры"}
			>
				<Filter className={styles.filterIcon} />
				<span className={styles.filterButtonText}>Фильтры</span>
			</button>

			{hasActiveFilters && (
				<button
					onClick={resetFilters}
					className={styles.resetButton}
					title="Сбросить все фильтры"
				>
					<X className={styles.resetIcon} />
					<span className={styles.resetButtonText}>Сбросить</span>
				</button>
			)}
		</div>
	);
};

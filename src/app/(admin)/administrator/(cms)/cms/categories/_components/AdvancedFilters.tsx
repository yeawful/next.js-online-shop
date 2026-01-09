import { useCategoryStore } from "@/store/categoryStore";
import { FilterType, SortField } from "../../types";
import styles from "./AdvancedFilters.module.css";

export const AdvancedFilters = () => {
	const {
		sortField,
		sortDirection,
		setSortField,
		setSortDirection,
		filterType,
		setFilterType,
	} = useCategoryStore();

	const handleSortFieldChange = (field: SortField) => {
		setSortField(field);
	};

	const handleSortDirectionChange = (direction: "asc" | "desc") => {
		setSortDirection(direction);
	};

	return (
		<div className={styles.filtersContainer}>
			<div className={styles.filtersGrid}>
				<div className={styles.filterGroup}>
					<label className={styles.filterLabel}>Искать в:</label>
					<select
						value={filterType}
						onChange={(e) => setFilterType(e.target.value as FilterType)}
						className={styles.select}
					>
						<option value="all">Во всех полях</option>
						<option value="name">Название</option>
						<option value="slug">Алиас</option>
						<option value="description">Описание</option>
						<option value="keywords">Ключевые слова</option>
						<option value="author">Автор</option>
					</select>
				</div>

				<div className={styles.filterGroup}>
					<label className={styles.filterLabel}>Сортировать по:</label>
					<select
						value={sortField}
						onChange={(e) => handleSortFieldChange(e.target.value as SortField)}
						className={styles.select}
					>
						<option value="numericId">ID</option>
						<option value="name">Название</option>
						<option value="slug">Алиас</option>
						<option value="createdAt">Дате создания</option>
						<option value="author">Автору</option>
					</select>
				</div>

				<div className={styles.filterGroup}>
					<label className={styles.filterLabel}>Порядок сортировки:</label>
					<div className={styles.sortButtonsContainer}>
						<button
							onClick={() => handleSortDirectionChange("asc")}
							className={`${styles.sortButton} ${
								sortDirection === "asc" ? styles.sortButtonActive : ""
							}`}
						>
							По возрастанию
						</button>
						<button
							onClick={() => handleSortDirectionChange("desc")}
							className={`${styles.sortButton} ${
								sortDirection === "desc" ? styles.sortButtonActive : ""
							}`}
						>
							По убыванию
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

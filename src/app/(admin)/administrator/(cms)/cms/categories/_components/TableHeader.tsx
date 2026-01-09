import { ChevronUp, ImageIcon } from "lucide-react";
import { SortField } from "../../types";
import { useCategoryStore } from "@/store/categoryStore";
import styles from "./TableHeader.module.css";

export const TableHeader = () => {
	const {
		currentPage,
		sortField,
		sortDirection,
		searchQuery,
		filterType,
		setSortField,
		setSortDirection,
		loadCategories,
	} = useCategoryStore();

	const handleSort = async (field: SortField) => {
		if (sortField === field) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortField(field);
			setSortDirection("asc");
		}
		await loadCategories({
			page: currentPage,
			search: searchQuery,
			filterType,
		});
	};

	const renderSortIcon = (field: SortField) => {
		if (sortField !== field) return null;

		return (
			<ChevronUp
				className={`w-4 h-4 ml-1 transition-transform duration-200 ${
					sortDirection === "desc" ? "rotate-180" : ""
				}`}
			/>
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.grid}>
				<div className={styles.headerCell}></div>
				<div
					className={`${styles.headerCell} ${styles.sortableCell} ${styles.centerContent}`}
					onClick={() => handleSort("numericId")}
					title="Сортировать по ID"
				>
					ID {renderSortIcon("numericId")}
				</div>
				<div
					className={`${styles.headerCell} ${styles.centerContent}`}
					title="Изображение категории"
				>
					<ImageIcon className={styles.icon} />
				</div>

				<div
					className={`${styles.headerCell} ${styles.sortableCell}`}
					onClick={() => handleSort("name")}
					title="Сортировать по названию"
				>
					Название {renderSortIcon("name")}
				</div>
				<div
					className={`${styles.headerCell} ${styles.sortableCell}`}
					onClick={() => handleSort("slug")}
					title="Сортировать по алиасу"
				>
					Алиас {renderSortIcon("slug")}
				</div>
				<div className={styles.headerCell}>Описание</div>
				<div className={`${styles.headerCell} ${styles.centerContent}`}>
					Ключевые слова
				</div>
				<div
					className={`${styles.headerCell} ${styles.sortableCell} ${styles.centerContent}`}
					onClick={() => handleSort("author")}
					title="Сортировать по автору"
				>
					Автор {renderSortIcon("author")}
				</div>
				<div
					className={`${styles.headerCell} ${styles.sortableCell}`}
					onClick={() => handleSort("createdAt")}
					title="Сортировать по дате создания"
				>
					Создана {renderSortIcon("createdAt")}
				</div>
				<div className={`${styles.headerCell} ${styles.centerContent}`}>
					Действия
				</div>
			</div>
		</div>
	);
};

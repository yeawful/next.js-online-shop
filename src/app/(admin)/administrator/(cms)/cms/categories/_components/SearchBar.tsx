import { Search, X } from "lucide-react";
import { useCategoryStore } from "@/store/categoryStore";
import styles from "./SearchBar.module.css";

export const SearchBar = () => {
	const {
		searchQuery,
		handleSearchChange,
		handleSearchClear,
		loadCategories,
		setCurrentPage,
	} = useCategoryStore();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		handleSearchChange(e.target.value);
	};

	const handleClear = async () => {
		handleSearchClear();
		setCurrentPage(1);
		await loadCategories({ page: 1, search: "" });
	};

	const handleSearchClick = async () => {
		if (searchQuery.trim() !== "") {
			setCurrentPage(1);
			await loadCategories({ page: 1, search: searchQuery });
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			handleSearchClick();
		}
	};

	return (
		<div className={styles.searchContainer}>
			<Search className={styles.searchIcon} />
			<input
				type="text"
				placeholder="Поиск..."
				value={searchQuery}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				className={styles.searchInput}
				autoComplete="off"
			/>
			<div className={styles.searchActions}>
				{searchQuery && (
					<button
						type="button"
						onClick={handleClear}
						className={styles.clearButton}
						title="Очистить поле поиска"
					>
						<X className={styles.clearIcon} />
					</button>
				)}
				<button
					type="button"
					onClick={handleSearchClick}
					className={styles.searchButton}
				>
					Найти
				</button>
			</div>
		</div>
	);
};

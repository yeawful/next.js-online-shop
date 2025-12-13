import { Search, Loader } from "lucide-react";
import styles from "./SearchStates.module.css";

interface SearchStatesProps {
	hasSearched: boolean;
	loading: boolean;
	searchTerm: string;
}

const SearchStates = ({ hasSearched, loading }: SearchStatesProps) => {
	if (!hasSearched && !loading) {
		return (
			<div className={styles.container}>
				<Search className={styles.searchIcon} />
				<p className={styles.title}>Введите запрос для поиска товаров</p>
				<p className={styles.subtitle}>
					Найдите товары по названию или артикулу
				</p>
			</div>
		);
	}

	if (loading) {
		return (
			<div className={styles.container}>
				<Loader className={styles.loadingIcon} />
				<p className={styles.loadingText}>Поиск товаров...</p>
			</div>
		);
	}

	return null;
};

export default SearchStates;

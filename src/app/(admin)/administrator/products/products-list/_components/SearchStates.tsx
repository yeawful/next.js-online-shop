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
			<div className={styles.initialState}>
				<Search size={48} className={styles.initialIcon} />
				<p className={styles.initialTitle}>Введите запрос для поиска товаров</p>
				<p className={styles.initialSubtitle}>
					Найдите товары по названию или артикулу
				</p>
			</div>
		);
	}

	if (loading) {
		return (
			<div className={styles.loadingState}>
				<Loader size={32} className={styles.loadingIcon} />
				<p className={styles.loadingText}>Поиск товаров...</p>
			</div>
		);
	}

	return null;
};

export default SearchStates;

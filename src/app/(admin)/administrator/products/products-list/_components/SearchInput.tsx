import { Search, Loader } from "lucide-react";
import styles from "./SearchInput.module.css";

interface SearchInputProps {
	searchTerm: string;
	loading: boolean;
	onSearchTermChange: (value: string) => void;
	onSearch: () => void;
	onKeyPress: (e: React.KeyboardEvent) => void;
}

const SearchInput = ({
	searchTerm,
	loading,
	onSearchTermChange,
	onSearch,
	onKeyPress,
}: SearchInputProps) => {
	const getHintClass = () => {
		if (searchTerm.trim().length === 0) {
			return styles.defaultHint;
		} else if (searchTerm.trim().length < 3) {
			return styles.warningHint;
		} else {
			return styles.successHint;
		}
	};

	const getHintText = () => {
		if (searchTerm.trim().length === 0) {
			return "Введите минимум 3 символа для поиска";
		} else if (searchTerm.trim().length < 3) {
			return `Введите еще ${3 - searchTerm.trim().length} символ(а, ов) для поиска`;
		} else {
			return "✓ Можно выполнить поиск";
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.searchWrapper}>
				<div className={styles.searchContainer}>
					<Search className={styles.searchIcon} />
					<input
						type="text"
						placeholder="Введите название товара или артикул..."
						value={searchTerm}
						onChange={(e) => onSearchTermChange(e.target.value)}
						onKeyDown={onKeyPress}
						className={styles.input}
					/>
				</div>
				<button
					onClick={onSearch}
					disabled={loading || searchTerm.trim().length < 3}
					className={styles.searchButton}
				>
					{loading ? (
						<Loader className={`${styles.buttonIcon} ${styles.spinner}`} />
					) : (
						<Search className={styles.buttonIcon} />
					)}
					Найти
				</button>
			</div>

			<p className={`${styles.hint} ${getHintClass()}`}>{getHintText()}</p>
		</div>
	);
};

export default SearchInput;

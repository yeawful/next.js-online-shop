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
	return (
		<div className={styles.container}>
			<div className={styles.inputWrapper}>
				<div className={styles.inputContainer}>
					<Search className={styles.searchIcon} size={20} />
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
						<Loader size={18} className={styles.searchButtonLoading} />
					) : (
						<Search size={18} />
					)}
					Найти
				</button>
			</div>

			<p className={styles.hint}>
				{searchTerm.trim().length === 0 ? (
					<span className={styles.hintEmpty}>
						Введите минимум 3 символа для поиска
					</span>
				) : searchTerm.trim().length < 3 ? (
					<span className={styles.hintWarning}>
						Введите еще {3 - searchTerm.trim().length} символа для поиска
					</span>
				) : (
					<span className={styles.hintSuccess}>✓ Можно выполнить поиск</span>
				)}
			</p>
		</div>
	);
};

export default SearchInput;

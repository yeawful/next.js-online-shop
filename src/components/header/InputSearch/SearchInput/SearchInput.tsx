import Image from "next/image";
import { SearchInputProps } from "@/types/searchInputProps";
import styles from "./SearchInput.module.css";

const SearchInput = ({
	query,
	setQuery,
	handleSearch,
	handleInputFocus,
	handleInputBlur,
}: SearchInputProps) => {
	return (
		<div className={styles.searchContainer}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					handleSearch();
				}}
			>
				<input
					type="text"
					value={query}
					placeholder="Найти товар"
					className={styles.searchInput}
					onFocus={handleInputFocus}
					onChange={(e) => setQuery(e.target.value)}
					onBlur={handleInputBlur}
				/>
				<button className={styles.searchButton} type="submit">
					<Image
						src="/icons-header/icon-search.svg"
						alt="Поиск"
						width={24}
						height={24}
					/>
				</button>
			</form>
		</div>
	);
};

export default SearchInput;

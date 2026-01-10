import { Search } from "lucide-react";
import { SidebarSearchInputProps } from "../types/sidebar.types";
import styles from "./SearchInput.module.css";

export default function SearchInput({
	value,
	onChange,
}: SidebarSearchInputProps) {
	return (
		<div className={styles.searchContainer}>
			<Search className={styles.searchIcon} />
			<input
				type="text"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder="Поиск категорий..."
				className={styles.searchInput}
				autoFocus
			/>
		</div>
	);
}

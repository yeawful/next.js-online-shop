import { X, Folder } from "lucide-react";
import { SidebarHeaderProps } from "../types/sidebar.types";
import SearchInput from "./SearchInput";
import styles from "./SidebarHeader.module.css";

export default function SidebarHeader({
	categoriesCount,
	onClose,
	searchQuery,
	onSearchChange,
}: SidebarHeaderProps) {
	return (
		<div className={styles.header}>
			<div className={styles.headerTop}>
				<div className={styles.logoContainer}>
					<div className={styles.iconWrapper}>
						<Folder className={styles.icon} />
					</div>
					<div className={styles.titleContainer}>
						<h2 className={styles.title}>Все категории</h2>
						<p className={styles.subtitle}>{categoriesCount} разделов</p>
					</div>
				</div>
				<button
					onClick={onClose}
					className={styles.closeButton}
					aria-label="Закрыть меню"
				>
					<X className={styles.closeIcon} />
				</button>
			</div>

			<SearchInput value={searchQuery} onChange={onSearchChange} />
		</div>
	);
}

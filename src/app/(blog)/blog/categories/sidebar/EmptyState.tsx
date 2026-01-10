import { Search } from "lucide-react";
import styles from "./EmptyState.module.css";

export default function EmptyState({
	hasSearchQuery,
}: {
	hasSearchQuery: boolean;
}) {
	return (
		<div className={styles.emptyContainer}>
			<div className={styles.iconWrapper}>
				<Search className={styles.icon} />
			</div>
			<p className={styles.message}>
				{hasSearchQuery ? "Категории не найдены" : "Нет доступных категорий"}
			</p>
		</div>
	);
}

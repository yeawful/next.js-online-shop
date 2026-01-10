import { FolderX } from "lucide-react";
import styles from "./EmptyState.module.css";

export default function EmptyState() {
	return (
		<div className={styles.emptyContainer}>
			<div className={styles.iconWrapper}>
				<FolderX className={styles.icon} strokeWidth={1.5} />
			</div>
			<h2 className={styles.title}>Категории не найдены</h2>
			<p className={styles.description}>
				Пока нет доступных категорий для отображения
			</p>
		</div>
	);
}

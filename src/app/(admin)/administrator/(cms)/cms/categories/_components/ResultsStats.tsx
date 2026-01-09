import { useCategoryStore } from "@/store/categoryStore";
import styles from "./ResultsStats.module.css";

export const ResultsStats = ({}) => {
	const { totalItems, totalAllItems, searchQuery } = useCategoryStore();
	return (
		<div className={styles.statsContainer}>
			Найдено: <span className={styles.statsNumber}>{totalItems}</span> из{" "}
			<span className={styles.statsNumber}>{totalAllItems}</span> категорий
			{searchQuery && (
				<span className={styles.searchQuery}>
					По запросу: &quot;
					<span className={styles.queryText}>{searchQuery}</span>
					&quot;
				</span>
			)}
		</div>
	);
};

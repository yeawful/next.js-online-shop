import styles from "./StatsInfo.module.css";

export default function StatsInfo({ count }: { count: number }) {
	return (
		<div className={styles.statsContainer}>
			<p className={styles.statsText}>
				Всего категорий: <span className={styles.statsNumber}>{count}</span>
			</p>
		</div>
	);
}

import { stats } from "../utils/stats";
import styles from "./StatsSkeleton.module.css";

export const StatsSkeleton = () => (
	<div className={styles.container}>
		<h2 className={styles.title}>Общая статистика</h2>
		<div className={styles.grid}>
			{stats.map((_, index) => (
				<div key={index} className={styles.statSkeleton}>
					<div className={styles.pulseAnimation}>
						<div className={styles.valueSkeleton}></div>
						<div className={styles.titleSkeleton}></div>
					</div>
				</div>
			))}
		</div>
	</div>
);

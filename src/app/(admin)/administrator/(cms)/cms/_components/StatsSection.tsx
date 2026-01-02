import { useCategoryStore } from "@/store/categoryStore";
import { useSiteSettings } from "../hooks/useSiteSettings";
import { useStatsValues } from "../hooks/useStatsValues";
import { getStatValue } from "../utils/getStatValue";
import { stats } from "../utils/stats";
import { StatItem } from "./StatItem";
import { StatsSkeleton } from "./StatsSkeleton";
import styles from "./StatsSection.module.css";

export const StatsSection = () => {
	const { categoriesCount, keywordsCount } = useStatsValues();
	const { loading: settingsLoading } = useSiteSettings();
	const { loading: categoriesLoading } = useCategoryStore();

	const loading = settingsLoading || categoriesLoading;

	if (loading) return <StatsSkeleton />;

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Общая статистика</h2>
			<div className={styles.grid}>
				{stats.map((stat, index) => (
					<StatItem
						key={index}
						stat={stat}
						statValue={getStatValue(
							stat.title,
							categoriesCount.toString(),
							keywordsCount.toString()
						)}
					/>
				))}
			</div>
		</div>
	);
};

export default StatsSection;

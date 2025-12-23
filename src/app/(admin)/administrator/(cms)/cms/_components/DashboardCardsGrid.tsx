import { useRouter } from "next/navigation";
import { DashboardCard } from "./DashboardCard";
import { dashboardCards } from "../utils/dashboardCards";
import styles from "./DashboardCardsGrid.module.css";

export const DashboardCardsGrid = () => {
	const router = useRouter();

	const navigateTo = (path: string) => {
		router.push(path);
	};

	return (
		<div className={styles.grid}>
			{dashboardCards.map((card) => (
				<DashboardCard key={card.id} card={card} navigateTo={navigateTo} />
			))}
		</div>
	);
};

export default DashboardCardsGrid;

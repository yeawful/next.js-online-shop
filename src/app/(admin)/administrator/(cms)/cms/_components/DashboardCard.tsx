import { DashboardCardProps } from "../types/dashboard";
import { getBgColor } from "../utils/getBgColor";
import { getButtonColor } from "../utils/getButtonColor";
import { getTextColor } from "../utils/getTextColor";
import styles from "./DashboardCard.module.css";

export const DashboardCard = ({ card, navigateTo }: DashboardCardProps) => {
	return (
		<div onClick={() => navigateTo(card.path)} className={styles.card}>
			<div className={styles.container}>
				<div className={`${styles.iconContainer} ${getBgColor(card.color)}`}>
					<div className={getTextColor(card.color)}>{card.icon}</div>
				</div>
				<h3 className={styles.title}>{card.title}</h3>
				<p className={styles.description}>{card.description}</p>
				<button
					className={`${styles.actionButton} ${getButtonColor(card.color)}`}
				>
					{card.actionText}
				</button>
			</div>
		</div>
	);
};

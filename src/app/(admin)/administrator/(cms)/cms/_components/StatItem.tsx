import { StatItemProps } from "../types/dashboard";
import { getBgColor } from "../utils/getBgColor";
import { getTextColor } from "../utils/getTextColor";
import styles from "./StatItem.module.css";

export const StatItem = ({ stat, statValue }: StatItemProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={`${styles.iconContainer} ${getBgColor(stat.color)}`}>
					<div className={getTextColor(stat.color)}>{stat.icon}</div>
				</div>
				<span className={`${styles.value} ${getTextColor(stat.color)}`}>
					{statValue}
				</span>
			</div>
			<h4 className={styles.title}>{stat.title}</h4>
		</div>
	);
};

export default StatItem;

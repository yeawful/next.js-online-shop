import { formatDateFull } from "../utils/dateFormatters";
import { formatDateNumeric } from "../utils/dateFormatters";
import styles from "./ScheduleTableHeader.module.css";

interface ScheduleTableHeaderProps {
	dates: string[];
}

export default function ScheduleTableHeader({
	dates,
}: ScheduleTableHeaderProps) {
	return (
		<div className={styles.header}>
			<div className={styles.timeHeader}>Время</div>
			{dates.map((date) => (
				<div
					key={date}
					className={`${styles.dateHeader} ${styles.lastDateHeader}`}
				>
					<div className={styles.dateTitle}></div>
					<div className={styles.dateNumeric}>{formatDateNumeric(date)}</div>
					<div className={styles.dateFull}>{formatDateFull(date)}</div>
				</div>
			))}
		</div>
	);
}

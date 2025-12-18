import SelectedIcon from "@/app/(cart)/cart/_components/SelectedIcon";
import styles from "./ScheduleTableRow.module.css";

interface ScheduleTableRowProps {
	timeSlot: string;
	dates: string[];
	schedule: { [date: string]: { [timeSlot: string]: boolean } };
	onRemoveTimeSlot: (slot: string) => void;
	onUpdateTimeSlotStatus: (
		date: string,
		timeSlot: string,
		free: boolean
	) => void;
}

export default function ScheduleTableRow({
	timeSlot,
	dates,
	schedule,
	onRemoveTimeSlot,
	onUpdateTimeSlotStatus,
}: ScheduleTableRowProps) {
	return (
		<div className={styles.row}>
			<div className={styles.timeCell}>
				<div className={styles.timeSlot}>{timeSlot}</div>
				<button
					onClick={() => onRemoveTimeSlot(timeSlot)}
					className={styles.removeButton}
				>
					Удалить слот
				</button>
			</div>

			{dates.map((date, index) => (
				<div
					key={date}
					className={`${styles.dateCell} ${index === dates.length - 1 ? styles.lastDateCell : ""}`}
				>
					<div className={styles.checkboxContainer}>
						<label className={styles.checkboxLabel}>
							<input
								type="checkbox"
								checked={schedule[date]?.[timeSlot] !== false}
								onChange={(e) =>
									onUpdateTimeSlotStatus(date, timeSlot, e.target.checked)
								}
								className={styles.checkboxInput}
							/>
							<span
								className={`${styles.checkbox} ${
									schedule[date]?.[timeSlot] !== false
										? styles.checkboxAvailable
										: styles.checkboxUnavailable
								}`}
							>
								{schedule[date]?.[timeSlot] !== false && <SelectedIcon />}
							</span>
						</label>
						<span
							className={`${styles.statusText} ${
								schedule[date]?.[timeSlot] !== false
									? styles.statusAvailable
									: styles.statusUnavailable
							}`}
						>
							{schedule[date]?.[timeSlot] !== false ? "Свободно" : "Занято"}
						</span>
					</div>
				</div>
			))}
		</div>
	);
}

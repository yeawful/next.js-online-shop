import ScheduleTableHeader from "./ScheduleTableHeader";
import ScheduleTableRow from "./ScheduleTableRow";
import styles from "./ScheduleTable.module.css";

interface ScheduleTableProps {
	sortedTimeSlots: string[];
	dates: string[];
	schedule: { [date: string]: { [timeSlot: string]: boolean } };
	onRemoveTimeSlot: (slot: string) => void;
	onUpdateTimeSlotStatus: (
		date: string,
		timeSlot: string,
		free: boolean
	) => void;
}

export default function ScheduleTable({
	sortedTimeSlots,
	dates,
	schedule,
	onRemoveTimeSlot,
	onUpdateTimeSlotStatus,
}: ScheduleTableProps) {
	if (sortedTimeSlots.length === 0) {
		return (
			<div className={styles.emptyState}>
				Нет добавленных временных слотов. Добавьте первый слот выше.
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<ScheduleTableHeader dates={dates} />

			<div className={styles.slotsContainer}>
				{sortedTimeSlots.map((timeSlot) => (
					<ScheduleTableRow
						key={timeSlot}
						timeSlot={timeSlot}
						dates={dates}
						schedule={schedule}
						onRemoveTimeSlot={onRemoveTimeSlot}
						onUpdateTimeSlotStatus={onUpdateTimeSlotStatus}
					/>
				))}
			</div>
		</div>
	);
}

import styles from "./AddTimeSlotForm.module.css";

interface AddTimeSlotFormProps {
	startTime: string;
	endTime: string;
	onStartTimeChange: (time: string) => void;
	onEndTimeChange: (time: string) => void;
	onAddTimeSlot: () => void;
}

export default function AddTimeSlotForm({
	startTime,
	endTime,
	onStartTimeChange,
	onEndTimeChange,
	onAddTimeSlot,
}: AddTimeSlotFormProps) {
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Добавить временной слот для всех дней</h2>
			<div className={styles.form}>
				<div className={styles.inputGroup}>
					<label className={styles.label}>Время начала</label>
					<input
						type="time"
						value={startTime}
						onChange={(e) => onStartTimeChange(e.target.value)}
						className={styles.input}
					/>
				</div>

				<div className={styles.inputGroup}>
					<label className={styles.label}>Время окончания</label>
					<input
						type="time"
						value={endTime}
						onChange={(e) => onEndTimeChange(e.target.value)}
						className={styles.input}
					/>
				</div>

				<button onClick={onAddTimeSlot} className={styles.button}>
					Добавить слот
				</button>
			</div>
		</div>
	);
}

import { useState, useEffect } from "react";
import { Schedule } from "@/types/deliverySchedule";
import MiniLoader from "@/components/loaders/MiniLoader";
import {
	formatDateFull,
	formatDateNumeric,
} from "@/app/(admin)/administrator/delivery-times/utils/dateFormatters";
import { formatTimeSlot } from "@/app/(cart)/cart/utils/formatTimeSlot";
import { AvailableDate } from "@/types/availableDate";
import { getAvailableDates } from "./utils/getAvailableDates";
import { getAvailableTimeSlots } from "./utils/getAvailableTimeSlots";
import { formatDisplayDate } from "./utils/formatDisplayDate";
import styles from "./DeliveryDatePicker.module.css";

interface DeliveryDatePickerProps {
	schedule: Schedule;
	isCreatingOrder: boolean;
	onDateSelect: (date: Date, timeSlot: string) => void;
	onCancel: () => void;
}

const DeliveryDatePicker: React.FC<DeliveryDatePickerProps> = ({
	schedule,
	isCreatingOrder,
	onDateSelect,
	onCancel,
}) => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null);
	const [availableDates, setAvailableDates] = useState<AvailableDate[]>([]);

	useEffect(() => {
		const dates = getAvailableDates(schedule);
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setAvailableDates(dates);

		if (dates.length > 0 && !selectedDate) {
			setSelectedDate(dates[0].date);
		}
	}, [schedule, selectedDate]);

	const handleDateSelect = (date: Date) => {
		setSelectedDate(date);
	};

	const handleTimeSlotSelect = (timeSlot: string) => {
		if (selectedDate) {
			onDateSelect(selectedDate, timeSlot);
		}
	};

	const formatDateToString = (date: Date): string => {
		return date.toISOString().split("T")[0];
	};

	const availableTimeSlots = selectedDate
		? getAvailableTimeSlots(selectedDate, schedule)
		: [];

	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<h3 className={styles.title}>Выберите дату и время доставки</h3>

				<div className={styles.dateSection}>
					<label className={styles.dateLabel}>Дата доставки:</label>
					<div className={styles.dateGrid}>
						{availableDates.map((item) => {
							const isSelected =
								selectedDate?.toDateString() === item.date.toDateString();
							return (
								<button
									key={item.dateString}
									onClick={() => handleDateSelect(item.date)}
									className={`${styles.dateButton} ${
										isSelected
											? styles.dateButtonSelected
											: styles.dateButtonUnselected
									}`}
								>
									<div
										className={`${styles.dateNumeric} ${
											isSelected ? "text-white" : "text-main-text"
										}`}
									>
										{formatDateNumeric(formatDateToString(item.date))}
									</div>
									<div
										className={`${styles.dateFull} ${
											isSelected ? "text-white" : "text-main-text"
										}`}
									>
										{formatDateFull(formatDateToString(item.date))}
									</div>
								</button>
							);
						})}
					</div>
				</div>

				{selectedDate && (
					<div className={styles.timeSection}>
						<label className={styles.timeLabel}>
							Доступное время доставки для {formatDisplayDate(selectedDate)}:
						</label>
						<div className={styles.timeGrid}>
							{availableTimeSlots.map((slot) => {
								const formatted = formatTimeSlot(slot);
								return (
									<button
										key={slot}
										onClick={() => handleTimeSlotSelect(slot)}
										disabled={isCreatingOrder}
										className={styles.timeButton}
									>
										<span className={styles.mobileTime}>
											{formatted.mobileLabel}
										</span>
										<span className={styles.desktopTime}>
											{formatted.desktopLabel}
										</span>
									</button>
								);
							})}
							{availableTimeSlots.length === 0 && (
								<p className={styles.noTimeSlots}>
									Нет доступных временных интервалов
								</p>
							)}
						</div>
					</div>
				)}

				<div className={styles.actions}>
					<button
						onClick={onCancel}
						className={styles.cancelButton}
						disabled={isCreatingOrder}
					>
						Отмена
					</button>
				</div>

				{isCreatingOrder && (
					<div className={styles.creatingOrder}>
						<MiniLoader />
						<p className={styles.loadingText}>Создаем заказ...</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default DeliveryDatePicker;

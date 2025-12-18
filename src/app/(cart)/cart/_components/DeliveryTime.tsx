import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Schedule } from "@/types/deliverySchedule";
import { getThreeDaysDates } from "@/app/(admin)/administrator/delivery-times/utils/getThreeDaysDates";
import DeliveryTimeSkeletons from "./DeliveryTimeSkeletons";
import { formatTimeSlot } from "../utils/formatTimeSlot";
import { isTimeSlotPassed } from "../utils/isTimeSlotPassed";
import styles from "./DeliveryTime.module.css";

interface DeliveryTimeProps {
	selectedDate: string;
	selectedTimeSlot: string;
	onDateChange: (date: string) => void;
	onTimeSlotChange: (timeSlot: string) => void;
}

const DeliveryTime = ({
	selectedDate,
	selectedTimeSlot,
	onDateChange,
	onTimeSlotChange,
}: DeliveryTimeProps) => {
	const [availableDates, setAvailableDates] = useState<
		{ value: string; label: string }[]
	>([]);
	const [tooltipSlot, setTooltipSlot] = useState<string | null>(null);
	const [schedule, setSchedule] = useState<Schedule>({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchDeliveryTimes = async () => {
			try {
				const response = await fetch("/api/delivery-times");
				const data = await response.json();

				if (data.schedule) {
					setSchedule(data.schedule);
				}
			} catch (error) {
				console.error("Ошибка загрузки графика доставки:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchDeliveryTimes();
	}, []);

	useEffect(() => {
		const dates = getThreeDaysDates().map((dateString) => {
			const [year, month, day] = dateString.split("-");
			const formattedDate = `${day}.${month}.${year}`;

			return {
				value: dateString,
				label: formattedDate,
			};
		});

		setAvailableDates(dates);

		if (!selectedDate && dates.length > 0) {
			onDateChange(dates[0].value);
		}
	}, [selectedDate, onDateChange]);

	const getAllTimeSlots = () => {
		if (!schedule[selectedDate]) return [];

		const daySchedule = schedule[selectedDate];
		const slots = Object.keys(daySchedule)
			.sort((a, b) => {
				const [startA] = a.split("-");
				const [startB] = b.split("-");
				return startA.localeCompare(startB);
			})
			.map((slot) => {
				const formatted = formatTimeSlot(slot);
				const isFree = daySchedule[slot] !== false;
				const isPassed = isTimeSlotPassed(slot, selectedDate);
				const isAvailable = isFree && !isPassed;

				return {
					value: slot,
					mobileLabel: formatted.mobileLabel,
					desktopLabel: formatted.desktopLabel,
					free: isAvailable,
					passed: isPassed,
				};
			});
		return slots;
	};

	const handleTimeSlotClick = (slot: {
		value: string;
		free: boolean;
		passed?: boolean;
	}) => {
		if (slot.free && !slot.passed) {
			onTimeSlotChange(slot.value);
		}
	};

	const timeSlots = getAllTimeSlots();

	if (loading) {
		return <DeliveryTimeSkeletons />;
	}

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Когда</h2>
			<div className={styles.contentWrapper}>
				<div className={styles.dateGroup}>
					<label className={styles.label}>Дата</label>
					<select
						value={selectedDate}
						onChange={(e) => onDateChange(e.target.value)}
						className={styles.select}
					>
						{availableDates.map((date) => (
							<option key={date.value} value={date.value}>
								{date.label}
							</option>
						))}
					</select>
				</div>
				<div className={styles.timeGroup}>
					<label className={styles.label}>Время</label>
					{timeSlots.length === 0 ? (
						<div className={styles.noDelivery}>
							На выбранную дату нет доставки
						</div>
					) : (
						<div className={styles.timeSlotsGrid}>
							{timeSlots.map((slot) => (
								<div
									key={slot.value}
									className={styles.timeSlotContainer}
									onMouseEnter={() =>
										(!slot.free || slot.passed) && setTooltipSlot(slot.value)
									}
									onMouseLeave={() => setTooltipSlot(null)}
									onTouchStart={() =>
										(!slot.free || slot.passed) && setTooltipSlot(slot.value)
									}
									onTouchEnd={() => setTooltipSlot(null)}
								>
									<button
										type="button"
										onClick={() => handleTimeSlotClick(slot)}
										className={`${styles.timeSlotButton} ${
											selectedTimeSlot === slot.value &&
											slot.free &&
											!slot.passed
												? styles.timeSlotSelected
												: slot.free && !slot.passed
													? styles.timeSlotAvailable
													: styles.timeSlotUnavailable
										}`}
										disabled={!slot.free || slot.passed}
									>
										<span className={styles.mobileTime}>
											{slot.mobileLabel}
										</span>
										<span className={styles.desktopTime}>
											{slot.desktopLabel}
										</span>
									</button>

									{(!slot.free || slot.passed) &&
										tooltipSlot === slot.value && (
											<div className={styles.tooltip}>
												<div className={styles.tooltipContent}>
													<Clock size={16} className={styles.tooltipIcon} />
													{slot.passed
														? "Это время уже прошло"
														: "На это время доставить не можем"}
												</div>
												<div className={styles.tooltipArrow}></div>
											</div>
										)}
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default DeliveryTime;

import { DayPicker } from "react-day-picker";
import { ru } from "date-fns/locale";
import "react-day-picker/style.css";
import "./daypicker.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Calendar.module.css";

interface CalendarProps {
	customDate: Date | undefined;
	onDateSelect: (date: Date | undefined) => void;
	month?: Date;
	isOrderDateChange?: boolean;
}

const Calendar = ({
	customDate,
	onDateSelect,
	month,
	isOrderDateChange = false,
}: CalendarProps) => {
	const [currentMonth, setCurrentMonth] = useState<Date>(
		month || customDate || new Date()
	);
	const getMonthName = (date: Date) => {
		const monthName = date.toLocaleDateString("ru-RU", {
			month: "long",
		});
		const capitalizedMonth =
			monthName.charAt(0).toUpperCase() + monthName.slice(1);
		const year = date.getFullYear();
		return `${capitalizedMonth} ${year}`;
	};

	const handlePreviousMonth = () => {
		const newDate = new Date(currentMonth);
		newDate.setMonth(newDate.getMonth() - 1);
		setCurrentMonth(newDate);
	};

	const handleNextMonth = () => {
		const newDate = new Date(currentMonth);
		newDate.setMonth(newDate.getMonth() + 1);
		setCurrentMonth(newDate);
	};

	useEffect(() => {
		if (month) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setCurrentMonth(month);
		}
	}, [month]);

	const containerClass = isOrderDateChange
		? styles.calendarContainerInline
		: styles.calendarContainer;

	return (
		<div className={containerClass}>
			<div className={styles.navigation}>
				<span className={styles.monthTitle}>{getMonthName(currentMonth)}</span>
				<div className={styles.navButtons}>
					<button onClick={handlePreviousMonth} className={styles.navButton}>
						<Image
							src="/icons-header/icon-arrow-right.svg"
							width={24}
							height={24}
							alt="Предыдущий месяц"
							className={`${styles.navIcon} ${styles.arrowPrev}`}
						/>
					</button>

					<button onClick={handleNextMonth} className={styles.navButton}>
						<Image
							src="/icons-header/icon-arrow-right.svg"
							width={24}
							height={24}
							alt="Следующий месяц"
							className={styles.navIcon}
						/>
					</button>
				</div>
			</div>
			<div className={styles.fullWidthCalendar}>
				<DayPicker
					mode="single"
					selected={customDate}
					onSelect={onDateSelect}
					locale={ru}
					month={currentMonth}
					onMonthChange={setCurrentMonth}
					showOutsideDays={true}
					className="p-0"
					classNames={{
						root: styles.dayPickerRoot,
						month: styles.dayPickerMonth,
						caption: "hidden",
						nav: "hidden",
						table: styles.dayPickerTable,
						head_row: styles.dayPickerHeadRow,
						head_cell: styles.dayPickerHeadCell,
						row: styles.dayPickerRow,
						cell: styles.dayPickerCell,
						day: styles.dayPickerDay,
						day_selected: styles.dayPickerDaySelected,
						day_today: styles.dayPickerDayToday,
						day_outside: styles.dayPickerDayOutside,
					}}
					modifiersStyles={{
						selected: {
							color: "white",
							backgroundColor: "var(--color-accent)",
							border: "none",
						},
						today: {
							color: "white",
							backgroundColor: "var(--color-accent)",
							border: "none",
						},
					}}
				/>
			</div>
		</div>
	);
};

export default Calendar;

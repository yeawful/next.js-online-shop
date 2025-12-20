import Image from "next/image";
import { Order } from "@/types/order";
import DateFilterButtons from "./DateFilterButtons";
import Calendar from "./Calendar";
import { useEffect, useState } from "react";
import styles from "./DateSelector.module.css";

interface DateSelectorProps {
	customDate: Date | undefined;
	selectedDate: string;
	dates: string[];
	orders: Order[];
	onDateSelect: (date: string) => void;
	isCalendarOpen: boolean;
	toggleCalendar: () => void;
	onCalendarDateSelect: (date: Date | undefined) => void;
}

const DateSelector = ({
	customDate,
	selectedDate,
	dates,
	orders,
	onDateSelect,
	isCalendarOpen,
	toggleCalendar,
	onCalendarDateSelect,
}: DateSelectorProps) => {
	const [calendarMonth, setCalendarMonth] = useState<Date | undefined>(
		customDate || new Date()
	);

	useEffect(() => {
		if (customDate) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setCalendarMonth(customDate);
		}
	}, [customDate]);

	const handleDateSelect = (date: Date | undefined) => {
		onCalendarDateSelect(date);
		if (date) {
			setCalendarMonth(date);
		}
	};

	return (
		<div className={styles.container}>
			<button
				type="button"
				onClick={toggleCalendar}
				className={styles.calendarButton}
			>
				<Image
					src="/icons-auth/icon-date2.svg"
					alt="Календарь"
					width={24}
					height={24}
				/>
			</button>
			{customDate && (
				<span className={styles.dateText}>
					{customDate.toLocaleDateString("ru-RU")}
				</span>
			)}
			{isCalendarOpen && (
				<Calendar
					customDate={customDate}
					onDateSelect={handleDateSelect}
					month={calendarMonth}
				/>
			)}
			<DateFilterButtons
				dates={dates}
				orders={orders}
				selectedDate={selectedDate}
				onDateSelect={onDateSelect}
			/>
		</div>
	);
};

export default DateSelector;

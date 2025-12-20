import { Order } from "@/types/order";
import { formatDisplayDate } from "../utils/formatDisplayDate";
import styles from "./DateFilterButtons.module.css";

interface DateFilterButtonsProps {
	dates: string[];
	orders: Order[];
	selectedDate: string;
	onDateSelect: (date: string) => void;
}

const DateFilterButtons = ({
	dates,
	orders,
	selectedDate,
	onDateSelect,
}: DateFilterButtonsProps) => {
	return (
		<div className={styles.container}>
			{dates.map((date) => {
				const ordersCount = orders.filter(
					(order) => order.deliveryDate === date
				).length;

				const isSelected = selectedDate === date;
				const buttonClass = isSelected
					? `${styles.button} ${styles.buttonSelected}`
					: `${styles.button} ${styles.buttonUnselected}`;

				return (
					<button
						key={date}
						onClick={() => onDateSelect(date)}
						className={buttonClass}
					>
						{formatDisplayDate(date)}
						<div className={styles.counter}>{ordersCount}</div>
					</button>
				);
			})}
		</div>
	);
};

export default DateFilterButtons;

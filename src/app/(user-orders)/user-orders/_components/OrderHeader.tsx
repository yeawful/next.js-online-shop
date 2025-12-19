import Image from "next/image";
import { formatPrice } from "../../../../utils/formatPrice";
import { formatOrderDate } from "./utils/formatOrderDate";
import { getStatusColor } from "./utils/getStatusColor";
import { getStatusText } from "./utils/getStatusText";
import { OrderHeaderProps } from "@/types/order";
import styles from "./OrderHeader.module.css";

const OrderHeader = ({
	order,
	showDeliveryButton,
	onOrderClick,
	onDeliveryClick,
	disabled = false,
}: OrderHeaderProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.dateInfo}>
				<p className={styles.date}>{formatOrderDate(order.deliveryDate)}</p>
				<p className={styles.time}>{order.deliveryTimeSlot}</p>
				<span className={`${styles.status} ${getStatusColor(order.status)}`}>
					{getStatusText(order.status)}
				</span>
			</div>
			<div className={styles.priceInfo}>
				<p className={styles.price}>{formatPrice(order.totalAmount)} ₽</p>
				{!showDeliveryButton ? (
					<button
						className={`${styles.orderButton} ${
							disabled ? styles.orderButtonDisabled : styles.orderButtonEnabled
						}`}
						onClick={onOrderClick}
						disabled={disabled}
					>
						{disabled ? "Недоступно" : "Заказать"}
					</button>
				) : (
					<button onClick={onDeliveryClick} className={styles.deliveryButton}>
						<Image
							src="/icons-auth/icon-date.svg"
							alt="Календарь"
							width={24}
							height={24}
							className={styles.deliveryIcon}
						/>
						<p className={styles.deliveryText}>
							Когда <span className={styles.desktopText}>доставить</span>
						</p>
					</button>
				)}
			</div>
		</div>
	);
};

export default OrderHeader;

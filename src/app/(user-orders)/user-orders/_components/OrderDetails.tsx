import { Order } from "@/types/order";
import styles from "./OrderDetails.module.css";

const OrderDetails: React.FC<{ order: Order }> = ({ order }) => {
	return (
		<>
			<div className={styles.addressContainer}>
				<p className={styles.addressLabel}>Адрес доставки:</p>
				<p className={styles.address}>
					{order.deliveryAddress.city}, {order.deliveryAddress.street},
					{order.deliveryAddress.house}
					{order.deliveryAddress.apartment &&
						`, кв. ${order.deliveryAddress.apartment}`}
				</p>
			</div>

			<div className={styles.detailsContainer}>
				<div className={styles.detailRow}>
					<span className={styles.detailLabel}>Скидка:</span>
					<span className={`${styles.detailValue} ${styles.discount}`}>
						-{order.discountAmount.toLocaleString("ru-RU")} ₽
					</span>
				</div>
				<div className={styles.detailRow}>
					<span className={styles.detailLabel}>Использовано бонусов:</span>
					<span className={styles.detailValue}>
						{order.usedBonuses.toLocaleString("ru-RU")}
					</span>
				</div>
				<div className={styles.detailRow}>
					<span className={styles.detailLabel}>Начислено бонусов:</span>
					<span className={`${styles.detailValue} ${styles.bonusesEarned}`}>
						+{order.earnedBonuses.toLocaleString("ru-RU")}
					</span>
				</div>
				<div className={styles.detailRow}>
					<span className={styles.detailLabel}>Способ оплаты:</span>
					<span className={styles.detailValue}>
						{order.paymentMethod === "online" ? "Онлайн" : "При получении"}
					</span>
				</div>
			</div>
		</>
	);
};

export default OrderDetails;

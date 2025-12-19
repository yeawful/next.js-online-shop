import { DeliveryData } from "@/types/cart";
import styles from "./DeliveryInfo.module.css";

interface DeliveryInfoProps {
	delivery: DeliveryData;
	onEdit: () => void;
}

export const DeliveryInfo: React.FC<DeliveryInfoProps> = ({
	delivery,
	onEdit,
}) => {
	return (
		<div className={styles.container}>
			<p className={styles.deliveryText}>
				<strong className={styles.strongText}>Время доставки:</strong>{" "}
				{new Date(delivery.time.date).toLocaleDateString()}{" "}
				{delivery.time.timeSlot}
			</p>
			<button className={styles.editButton} onClick={onEdit}>
				Изменить время доставки
			</button>
		</div>
	);
};

import { CheckCircle } from "lucide-react";
import { formatPrice } from "../../../../utils/formatPrice";
import styles from "./PricePreservedAlert.module.css";

interface PricePreservedAlertProps {
	orderTotal: number;
}

export const PricePreservedAlert: React.FC<PricePreservedAlertProps> = ({
	orderTotal,
}) => {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.textContainer}>
					<h3 className={styles.title}>
						<CheckCircle className={styles.icon} />
						Цены сохранены
					</h3>
					<p className={styles.description}>
						Цены и скидки на товары не изменились. Повторный заказ будет создан
						с теми же ценами, что и в предыдущем заказе.
					</p>
					<div className={styles.priceContainer}>
						<p className={styles.price}>
							Сумма заказа: {formatPrice(orderTotal)} ₽
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

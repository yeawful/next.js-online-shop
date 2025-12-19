import { AlertTriangle } from "lucide-react";
import { formatPrice } from "../../../../utils/formatPrice";
import { PriceComparison } from "@/types/userOrder";
import styles from "./PriceComparisonAlert.module.css";

interface PriceComparisonAlertProps {
	priceComparison: PriceComparison;
	onClose: () => void;
}

export const PriceComparisonAlert: React.FC<PriceComparisonAlertProps> = ({
	priceComparison,
	onClose,
}) => {
	console.log(priceComparison);
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.textContainer}>
					<h3 className={styles.title}>
						<AlertTriangle className={styles.icon} />
						Внимание: цены или скидки изменились
					</h3>
					<p className={styles.description}>
						С момента предыдущего заказа произошли изменения. Заказ будет создан
						по актуальным ценам и скидкам, а также с учетом статуса карты
						лояльности и скидок по ней.
					</p>

					{priceComparison.changedItems.length > 0 && (
						<div className="mt-2">
							<p className={styles.changesTitle}>Изменения:</p>
							<ul className={styles.changesList}>
								{priceComparison.changedItems.map((item, index) => (
									<li key={index} className={styles.changeItem}>
										<span className={styles.productName}>
											{item.productName}
										</span>
										<div className={styles.priceInfo}>
											{item.priceChanged && (
												<span>
													Цена: {formatPrice(item.originalPrice)} ₽ →{" "}
													{formatPrice(item.currentPrice)} ₽
												</span>
											)}
											{item.quantity > 1 && (
												<span>Количество: ×{item.quantity}</span>
											)}
										</div>
									</li>
								))}
							</ul>
						</div>
					)}

					<div className={styles.summaryContainer}>
						<p className={styles.summaryText}>
							<span className={styles.summaryLine}>
								Сумма в предыдущем заказе:{" "}
								{formatPrice(priceComparison.originalTotal)} ₽
							</span>
							<span className={styles.summaryLine}>
								Сумма по актуальным ценам:{" "}
								{formatPrice(priceComparison.currentTotal)} ₽
							</span>
							{priceComparison.difference !== 0 && (
								<span
									className={`${styles.summaryLine} ${
										priceComparison.difference > 0
											? styles.priceIncrease
											: styles.priceDecrease
									}`}
								>
									Изменение: {priceComparison.difference > 0 ? "+" : ""}
									{formatPrice(priceComparison.difference)} ₽
								</span>
							)}
						</p>
					</div>
				</div>
				<button onClick={onClose} className={styles.closeButton}>
					×
				</button>
			</div>
		</div>
	);
};

import { formatPrice } from "../../../../utils/formatPrice";
import Bonuses from "@/app/(catalog)/catalog/[category]/(productPage)/[id]/_components/Bonuses";
import { CartSummaryProps } from "../../../../types/cart";
import { getFullEnding } from "../../../../utils/getWordEnding";
import styles from "./CartSummary.module.css";

const CartSummary = ({
	visibleCartItems,
	totalMaxPrice,
	totalDiscount,
	finalPrice,
	totalBonuses,
	isMinimumReached,
}: CartSummaryProps) => {
	return (
		<>
			<div className={styles.summarySection}>
				<div className={styles.summaryRow}>
					<p className={styles.itemCount}>
						{visibleCartItems.length}{" "}
						{`товар${getFullEnding(visibleCartItems.length)}`}
					</p>
					<p className={styles.itemCountPrice}>
						{formatPrice(totalMaxPrice)} ₽
					</p>
				</div>

				<div className={styles.summaryRow}>
					<p className={styles.discountText}>Скидка</p>
					<p className={styles.discountAmount}>
						-{formatPrice(totalDiscount)} ₽
					</p>
				</div>
			</div>

			<div className={styles.finalSection}>
				<div className={styles.totalRow}>
					<span>Итог:</span>
					<span className={styles.totalAmount}>
						{formatPrice(finalPrice)} ₽
					</span>
				</div>
				<Bonuses bonus={totalBonuses} />
				<div className="w-full">
					{!isMinimumReached && (
						<div className={styles.minimumWarning}>
							Минимальная сумма заказа 1000р
						</div>
					)}

					<button
						disabled={!isMinimumReached || visibleCartItems.length === 0}
						className={`${styles.orderButton} ${
							isMinimumReached && visibleCartItems.length > 0
								? styles.buttonActive
								: styles.buttonInactive
						}`}
					>
						Оформить заказ
					</button>
				</div>
			</div>
		</>
	);
};

export default CartSummary;

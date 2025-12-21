import { CartItem } from "@/types/cart";
import { formatPrice } from "../../../../utils/formatPrice";
import { getFullEnding } from "../../../../utils/getWordEnding";
import Bonuses from "@/app/(catalog)/catalog/[category]/(productPage)/[slug]/_components/Bonuses";
import styles from "./PriceSummary.module.css";

interface PriceSummaryProps {
	visibleCartItems: CartItem[];
	totalMaxPrice: number;
	totalDiscount: number;
	finalPrice: number;
	totalBonuses: number;
}

const PriceSummary = ({
	visibleCartItems,
	totalMaxPrice,
	totalDiscount,
	finalPrice,
	totalBonuses,
}: PriceSummaryProps) => {
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
			</div>
		</>
	);
};

export default PriceSummary;

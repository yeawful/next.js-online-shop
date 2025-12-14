import { memo } from "react";
import { formatPrice } from "../../../../utils/formatPrice";
import styles from "./PriceDisplay.module.css";

interface PriceDisplayProps {
	finalPrice: number;
	priceWithDiscount: number;
	totalFinalPrice: number;
	totalPriceWithoutCard: number;
	hasDiscount: boolean;
	hasLoyaltyCard: boolean;
	isOutOfStock: boolean;
}

const PriceDisplay = memo(function PriceDisplay({
	finalPrice,
	priceWithDiscount,
	hasDiscount,
	isOutOfStock,
}: PriceDisplayProps) {
	return (
		<>
			<div className={styles.priceContainer}>
				{hasDiscount ? (
					<>
						<div className={styles.priceColumn}>
							<span
								className={
									isOutOfStock
										? styles.discountPriceOutOfStock
										: styles.discountPrice
								}
							>
								{formatPrice(finalPrice)} ₽
							</span>
							<span className={styles.discountLabel}>С картой</span>
						</div>
						<div className={styles.priceColumn}>
							<span
								className={
									isOutOfStock
										? styles.regularPriceOutOfStock
										: styles.regularPrice
								}
							>
								{formatPrice(priceWithDiscount)} ₽
							</span>
							<span className={styles.regularLabel}>Обычная</span>
						</div>
					</>
				) : (
					<div className={styles.priceColumn}>
						<span
							className={
								isOutOfStock
									? styles.discountPriceOutOfStock
									: styles.discountPrice
							}
						>
							{formatPrice(priceWithDiscount)} ₽
						</span>
					</div>
				)}
				<span className={styles.perUnit}>за шт.</span>
			</div>
		</>
	);
});

export default PriceDisplay;

import { memo } from "react";
import styles from "./QuantitySelector.module.css";

interface QuantitySelectorProps {
	quantity: number;
	isUpdating: boolean;
	isOutOfStock: boolean;
	onDecrement: () => void;
	onIncrement: () => void;
	onProductCard?: boolean;
}

const QuantitySelector = memo(function QuantitySelector({
	quantity,
	isUpdating,
	isOutOfStock,
	onDecrement,
	onIncrement,
	onProductCard,
}: QuantitySelectorProps) {
	const containerClass = onProductCard
		? `${styles.container} ${styles.containerProductCard}`
		: `${styles.container} ${styles.containerRegular}`;

	return (
		<div className={containerClass}>
			<button
				onClick={onDecrement}
				disabled={quantity < 0 || isUpdating || isOutOfStock}
				className={styles.button}
			>
				<div className={styles.minusIcon}></div>
			</button>

			<span className={styles.quantity}>{isUpdating ? "..." : quantity}</span>

			<button
				onClick={onIncrement}
				disabled={isUpdating || isOutOfStock}
				className={styles.button}
			>
				<div className={styles.plusIcon}>
					<div className={styles.plusIconHorizontal}></div>
					<div className={styles.plusIconVertical}></div>
				</div>
			</button>
		</div>
	);
});

export default QuantitySelector;

import { memo } from "react";
import styles from "./QuantitySelector.module.css";

interface QuantitySelectorProps {
	quantity: number;
	isUpdating: boolean;
	isOutOfStock: boolean;
	onDecrement: () => void;
	onIncrement: () => void;
}

const QuantitySelector = memo(function QuantitySelector({
	quantity,
	isUpdating,
	isOutOfStock,
	onDecrement,
	onIncrement,
}: QuantitySelectorProps) {
	return (
		<div className={styles.container}>
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

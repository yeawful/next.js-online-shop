import styles from "./CheckoutButton.module.css";

interface CheckoutButtonProps {
	isCheckout: boolean;
	isMinimumReached: boolean;
	visibleCartItemsCount: number;
	onCheckout: () => void;
}

export const CheckoutButton = ({
	isCheckout,
	isMinimumReached,
	visibleCartItemsCount,
	onCheckout,
}: CheckoutButtonProps) => {
	if (isCheckout) return null;
	return (
		<button
			onClick={onCheckout}
			disabled={!isMinimumReached || visibleCartItemsCount === 0}
			className={`${styles.button} ${
				isMinimumReached && visibleCartItemsCount > 0
					? styles.buttonActive
					: styles.buttonInactive
			}`}
		>
			Оформить заказ
		</button>
	);
};

export default CheckoutButton;

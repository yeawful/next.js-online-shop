import OrderSuccessMessage from "./OrderSuccessMessage";
import styles from "./PaymentButtons.module.css";

interface PaymentButtonsProps {
	isOrdered: boolean;
	paymentType: "cash_on_delivery" | "online" | null;
	orderNumber: string | null;
	isProcessing: boolean;
	canProceedWithPayment: boolean;
	onOnlinePayment: () => void;
	onCashPayment: () => void;
}

export const PaymentButtons = ({
	isOrdered,
	paymentType,
	orderNumber,
	isProcessing,
	canProceedWithPayment,
	onOnlinePayment,
	onCashPayment,
}: PaymentButtonsProps) => {
	if (isOrdered && paymentType === "cash_on_delivery") {
		return <OrderSuccessMessage orderNumber={orderNumber} />;
	}

	if (isOrdered) return null;

	return (
		<div className={styles.container}>
			<button
				disabled={!canProceedWithPayment}
				onClick={onOnlinePayment}
				className={`${styles.onlinePaymentButton} ${
					canProceedWithPayment ? styles.buttonActive : styles.buttonInactive
				}`}
			>
				{isProcessing ? "Обработка..." : "Оплатить на сайте"}
			</button>

			<button
				disabled={!canProceedWithPayment}
				onClick={onCashPayment}
				className={`${styles.cashPaymentButton} ${
					canProceedWithPayment
						? styles.cashPaymentActive
						: styles.cashPaymentDisabled
				}`}
			>
				{isProcessing ? "Оформление..." : "Оплатить при получении"}
			</button>
		</div>
	);
};

export default PaymentButtons;

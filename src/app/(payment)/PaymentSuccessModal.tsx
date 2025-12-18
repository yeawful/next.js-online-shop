import { PaymentSuccessData } from "@/types/payment";
import { formatPrice } from "../../utils/formatPrice";
import styles from "./PaymentSuccessModal.module.css";

interface PaymentSuccessModalProps {
	isOpen: boolean;
	onClose: () => void;
	successData: PaymentSuccessData | null;
}

const PaymentSuccessModal = ({
	isOpen,
	onClose,
	successData,
}: PaymentSuccessModalProps) => {
	if (!isOpen || !successData) return null;

	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<div className={styles.iconContainer}>
					<svg
						className={styles.icon}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M5 13l4 4L19 7"
						/>
					</svg>
				</div>

				<h2 className={styles.title}>Оплата прошла успешно!</h2>

				<div className={styles.details}>
					<div className={styles.detailRow}>
						<span className={styles.detailLabel}>Номер заказа:</span>
						<span className={styles.detailValue}>
							{successData.orderNumber}
						</span>
					</div>
					<div className={styles.detailRow}>
						<span className={styles.detailLabel}>ID платежа:</span>
						<span className={`${styles.detailValue} ${styles.paymentId}`}>
							{successData.paymentId}
						</span>
					</div>
					<div className={styles.detailRow}>
						<span className={styles.detailLabel}>Сумма:</span>
						<span className={styles.detailValue}>
							{formatPrice(successData.amount)} ₽
						</span>
					</div>
					<div className={styles.detailRow}>
						<span className={styles.detailLabel}>Карта:</span>
						<span className={`${styles.detailValue} ${styles.cardNumber}`}>
							**** {successData.cardLast4}
						</span>
					</div>
				</div>

				<p className={styles.message}>
					Ваш заказ успешно оплачен и передан в обработку. В ближайшее время с
					Вами свяжется наш менеджер для подтверждения доставки.
				</p>

				<button onClick={onClose} className={styles.button}>
					Понятно
				</button>
			</div>
		</div>
	);
};

export default PaymentSuccessModal;

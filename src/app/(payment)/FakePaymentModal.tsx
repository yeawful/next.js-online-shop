import { useState, FormEvent } from "react";
import {
	FakePaymentModalProps,
	FakePaymentData,
	PaymentSimulationResult,
} from "@/types/payment";
import { formatPrice } from "../../utils/formatPrice";
import styles from "./FakePaymentModal.module.css";

interface TestCard {
	number: string;
	description: string;
	result: PaymentSimulationResult;
}

const FakePaymentModal = ({
	amount,
	isOpen,
	onClose,
	onSuccess,
	onError,
}: FakePaymentModalProps) => {
	const [isProcessing, setIsProcessing] = useState<boolean>(false);
	const [cardNumber, setCardNumber] = useState<string>("");
	const [expiryDate, setExpiryDate] = useState<string>("");
	const [cvc, setCvc] = useState<string>("");
	const [cardholder, setCardholder] = useState<string>("");

	if (!isOpen) return null;

	const testCards: TestCard[] = [
		{
			number: "5555 5555 5555 4444",
			description: "Успешная оплата",
			result: "success",
		},
		{
			number: "4111 1111 1111 1111",
			description: "Недостаточно средств",
			result: "failure",
		},
		{
			number: "4000 0000 0000 0002",
			description: "Ошибка банка",
			result: "error",
		},
	];

	const simulatePayment = async (
		simulatedResult: PaymentSimulationResult
	): Promise<void> => {
		if (!isOpen) return;

		setIsProcessing(true);

		await new Promise((resolve) => setTimeout(resolve, 2000));

		try {
			const basePaymentData: Omit<FakePaymentData, "status"> = {
				id: `fake_pay_${Date.now()}`,
				amount,
				cardLast4: cardNumber.slice(-4) || "4444",
				timestamp: new Date().toISOString(),
				processor: "fake_payment_system",
			};

			switch (simulatedResult) {
				case "success":
					onSuccess({
						...basePaymentData,
						status: "succeeded",
					});
					break;
				case "failure":
					onError(
						'Недостаточно средств на карте. Повторную попытку оплаты Вы можете совершить на странице "Заказы"'
					);
					break;
				case "error":
					onError(
						'Ошибка банка-эмитента. Повторную попытку оплаты Вы можете совершить на странице "Заказы"'
					);
					break;
			}
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Произошла неизвестная ошибка";
			onError(errorMessage);
		} finally {
			setIsProcessing(false);
		}
	};

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		const testCard = testCards.find((card) =>
			cardNumber.replace(/\s/g, "").includes(card.number.replace(/\s/g, ""))
		);

		const result: PaymentSimulationResult = testCard?.result || "error";
		simulatePayment(result);
	};

	const fillTestCard = (
		cardNumber: string,
		result: PaymentSimulationResult
	): void => {
		setCardNumber(cardNumber.replace(/\s/g, ""));
		setExpiryDate("12/28");
		setCvc("123");
		setCardholder("IVAN IVANOV");

		setTimeout(() => {
			simulatePayment(result);
		}, 300);
	};

	const handleCardNumberChange = (value: string): void => {
		const formattedValue = value
			.replace(/\s/g, "")
			.replace(/(\d{4})/g, "$1 ")
			.trim()
			.slice(0, 19);

		setCardNumber(formattedValue);
	};

	const handleExpiryDateChange = (value: string): void => {
		const formattedValue = value
			.replace(/\D/g, "")
			.replace(/(\d{2})(\d)/, "$1/$2")
			.slice(0, 5);

		setExpiryDate(formattedValue);
	};

	const handleCvcChange = (value: string): void => {
		const formattedValue = value.replace(/\D/g, "").slice(0, 3);
		setCvc(formattedValue);
	};

	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<h2 className={styles.title}>Тестовая оплата</h2>
				<p className={styles.amount}>Сумма: {formatPrice(amount)} ₽</p>
				<div className={styles.testCards}>
					<h3 className={styles.testCardsTitle}>
						Тестовые карты (авто-оплата):
					</h3>
					{testCards.map((card, index) => (
						<button
							key={index}
							type="button"
							onClick={() => fillTestCard(card.number, card.result)}
							disabled={isProcessing}
							className={styles.testCardButton}
						>
							<span className={styles.testCardNumber}>{card.number}</span>
							<span className={styles.testCardDescription}>
								- {card.description}
							</span>
						</button>
					))}
				</div>

				<form onSubmit={handleFormSubmit} className={styles.form}>
					<div className={styles.formGroup}>
						<label className={styles.label}>Номер карты</label>
						<input
							type="text"
							value={cardNumber}
							onChange={(e) => handleCardNumberChange(e.target.value)}
							placeholder="0000 0000 0000 0000"
							className={`${styles.input} ${styles.cardNumberInput}`}
							required
							maxLength={19}
							disabled={isProcessing}
						/>
					</div>

					<div className={styles.formGrid}>
						<div className={styles.formGroup}>
							<label className={styles.label}>Срок действия</label>
							<input
								type="text"
								value={expiryDate}
								onChange={(e) => handleExpiryDateChange(e.target.value)}
								placeholder="ММ/ГГ"
								className={styles.input}
								required
								maxLength={5}
								disabled={isProcessing}
							/>
						</div>
						<div className={styles.formGroup}>
							<label className={styles.label}>CVC</label>
							<input
								type="text"
								value={cvc}
								onChange={(e) => handleCvcChange(e.target.value)}
								placeholder="123"
								className={styles.input}
								required
								maxLength={3}
								disabled={isProcessing}
							/>
						</div>
					</div>

					<div className={styles.formGroup}>
						<label className={styles.label}>Имя держателя</label>
						<input
							type="text"
							value={cardholder}
							onChange={(e) => setCardholder(e.target.value.toUpperCase())}
							placeholder="IVAN IVANOV"
							className={`${styles.input} ${styles.nameInput}`}
							required
							disabled={isProcessing}
						/>
					</div>

					<div className={styles.actions}>
						<button
							type="button"
							onClick={onClose}
							disabled={isProcessing}
							className={styles.cancelButton}
						>
							Отмена
						</button>
						<button
							type="submit"
							disabled={
								isProcessing ||
								!cardNumber ||
								!expiryDate ||
								!cvc ||
								!cardholder
							}
							className={styles.payButton}
						>
							{isProcessing
								? "Обработка..."
								: `Оплатить ${formatPrice(amount)} ₽`}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default FakePaymentModal;

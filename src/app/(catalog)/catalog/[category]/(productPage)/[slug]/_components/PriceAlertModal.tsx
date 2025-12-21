"use client";

import { useActionState, useEffect } from "react";
import { createPriceAlert, PriceAlertFormState } from "@/actions/priceAlerts";
import styles from "./PriceAlertModal.module.css";

interface PriceAlertModalProps {
	isOpen: boolean;
	onCloseAction: () => void;
	productId: string;
	productTitle: string;
	currentPrice: string;
	onSuccessAction: (unsubscribeToken: string) => void;
}

export const PriceAlertModal = ({
	onCloseAction,
	productId,
	productTitle,
	currentPrice,
	onSuccessAction,
}: PriceAlertModalProps) => {
	const handleSubmit = async (
		prevState: PriceAlertFormState | null,
		formData: FormData
	): Promise<PriceAlertFormState> => {
		formData.append("productId", productId);
		formData.append("productTitle", productTitle);
		formData.append("currentPrice", currentPrice);

		return createPriceAlert(prevState, formData);
	};

	const [state, formAction, isPending] = useActionState(
		handleSubmit,
		{} as PriceAlertFormState
	);

	useEffect(() => {
		if (state?.success && state.unsubscribeToken) {
			onSuccessAction(state.unsubscribeToken);
			onCloseAction();
		}
	}, [state, onSuccessAction, onCloseAction]);

	return (
		<div className={styles.modal}>
			<h3 className={styles.title}>Уведомление о снижении цены</h3>

			<form action={formAction} className={styles.form}>
				<div>
					<input
						type="email"
						name="email"
						required
						placeholder="Ваш email"
						className={`${styles.input} ${state?.errors?.email ? styles.inputError : ""}`}
						disabled={isPending}
					/>
					{state?.errors?.email && (
						<p className={styles.errorText}>{state.errors.email}</p>
					)}
				</div>

				{state?.errors?.general && (
					<p className={styles.errorText}>{state.errors.general}</p>
				)}

				<div className={styles.buttons}>
					<button
						type="submit"
						disabled={isPending}
						className={styles.submitButton}
					>
						{isPending ? "Подписка..." : "Подписаться"}
					</button>

					<button
						type="button"
						onClick={onCloseAction}
						disabled={isPending}
						className={styles.cancelButton}
					>
						Отмена
					</button>
				</div>
			</form>
		</div>
	);
};

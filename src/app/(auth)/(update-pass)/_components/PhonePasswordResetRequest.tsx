"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { AuthFormLayout } from "../../_components/AuthFormLayout";
import { Loader2, Phone, KeyRound } from "lucide-react";
import { InputMask } from "@react-input/mask";
import styles from "./PhonePasswordResetRequest.module.css";

interface PhonePasswordResetRequestProps {
	onSuccessAction: (phone: string) => void;
	loading: boolean;
	setLoadingAction: (loading: boolean) => void;
	error: string | null;
	setErrorAction: (error: string | null) => void;
}

export const PhonePasswordResetRequest = ({
	onSuccessAction,
	loading,
	setLoadingAction,
	error,
	setErrorAction,
}: PhonePasswordResetRequestProps) => {
	const [phone, setPhone] = useState("");

	const handleRequestReset = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoadingAction(true);
		setErrorAction(null);

		try {
			const { error: resetError } =
				await authClient.phoneNumber.requestPasswordReset({
					phoneNumber: phone.replace(/\D/g, ""),
				});

			if (resetError) {
				if (resetError.message?.toLowerCase().includes("isn't registered")) {
					throw new Error("Номер телефона не зарегистрирован в системе");
				}
				throw new Error(resetError.message || "Не удалось отправить код");
			}

			onSuccessAction(phone);
		} catch (err) {
			setErrorAction(err instanceof Error ? err.message : "Произошла ошибка");
		} finally {
			setLoadingAction(false);
		}
	};

	return (
		<AuthFormLayout>
			<div className={styles.container}>
				<div className={styles.header}>
					<KeyRound className={styles.icon} />
					<h1 className={styles.title}>Сброс пароля для телефона</h1>
				</div>

				<p className={styles.description}>
					Введите номер телефона, на который придет код для сброса пароля
				</p>

				{error && <div className={styles.error}>{error}</div>}

				<form onSubmit={handleRequestReset} className={styles.form}>
					<div>
						<label htmlFor="phone" className={styles.label}>
							Номер телефона
						</label>

						<InputMask
							mask="+7 (___) ___-__-__"
							replacement={{ _: /\d/ }}
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
							placeholder="+7 (___) ___-__-__"
							className={styles.input}
							required
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className={`${styles.button} ${loading ? styles.buttonInactive : styles.buttonActive}`}
					>
						{loading ? (
							<>
								<Loader2 className={styles.loader} />
								Отправка...
							</>
						) : (
							<>
								<Phone className={styles.buttonIcon} />
								Отправить код
							</>
						)}
					</button>
				</form>
			</div>
		</AuthFormLayout>
	);
};

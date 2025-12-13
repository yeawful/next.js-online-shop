"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { AuthFormLayout } from "../../../_components/AuthFormLayout";
import { Loader2, Mail, KeyRound } from "lucide-react";
import SuccessSentEmail from "../../_components/SuccessSentEmail";
import styles from "./page.module.css";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const { error } = await authClient.requestPasswordReset({
				email,
				redirectTo: `${window.location.origin}/email-pass-reset`,
			});

			if (error) {
				throw new Error(error.message);
			}

			setSuccess(true);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Произошла ошибка");
		} finally {
			setLoading(false);
		}
	};

	if (success) {
		return <SuccessSentEmail email={email} />;
	}

	return (
		<AuthFormLayout>
			<div className={styles.container}>
				<div className={styles.header}>
					<KeyRound className={styles.icon} />
					<h1 className={styles.title}>Восстановление / сброс пароля</h1>
				</div>
				<p className={styles.description}>
					Введите email, по которому проходила регистрация, и мы вышлем Вам
					инструкции по сбросу пароля.
				</p>
				{error && <div className={styles.error}>{error}</div>}
				<form
					onSubmit={handleSubmit}
					className={styles.form}
					autoComplete="off"
				>
					<div>
						<label htmlFor="email" className={styles.label}>
							E-mail
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className={styles.input}
							required
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className={`${styles.button} ${loading ? styles.buttonInactive : styles.buttonActive} ${loading ? styles.loading : ""}`}
					>
						{loading ? (
							<>
								<Loader2 className={styles.loader} />
								Отправка...
							</>
						) : (
							<>
								<Mail className={styles.buttonIcon} />
								Отправить инструкции
							</>
						)}
					</button>
				</form>
			</div>
		</AuthFormLayout>
	);
};

export default ForgotPassword;

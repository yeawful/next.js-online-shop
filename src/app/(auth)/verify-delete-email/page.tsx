"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { AuthFormLayout } from "../_components/AuthFormLayout";
import { Loader2, Trash2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

const VerifyDeleteEmailPage = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [success, setSuccess] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError(null);

		try {
			const { error } = await authClient.deleteUser({
				callbackURL: "/goodbye",
			});

			if (error) {
				throw new Error(error.message);
			}

			setSuccess(true);
			router.replace("/");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Произошла ошибка");
		} finally {
			setLoading(false);
		}
	};

	if (success) {
		return (
			<AuthFormLayout>
				<div className={styles.centerContent}>
					<h1 className={styles.successTitle}>Проверьте Вашу почту</h1>
					<p>Мы отправили письмо с подтверждением удаления аккаунта.</p>
				</div>
			</AuthFormLayout>
		);
	}

	return (
		<AuthFormLayout>
			<div className={styles.container}>
				<div className={styles.iconContainer}>
					<Trash2 className={styles.trashIcon} />
					<h1 className={styles.deleteTitle}>Удаление аккаунта</h1>
				</div>
				<p className={styles.description}>
					Для подтверждения удаления аккаунта мы отправим письмо с инструкциями
					на Вашу почту, по которой Вы регистрировались.
				</p>
				{error && <div className={styles.errorMessage}>{error}</div>}
				<form
					onSubmit={handleSubmit}
					className={styles.form}
					autoComplete="off"
				>
					<button
						type="submit"
						disabled={loading}
						className={styles.submitButton}
					>
						{loading ? (
							<>
								<Loader2 className={styles.loaderIcon} />
								Отправка...
							</>
						) : (
							<>
								<Mail className={styles.mailIcon} />
								Отправить подтверждение
							</>
						)}
					</button>
				</form>
			</div>
		</AuthFormLayout>
	);
};

export default VerifyDeleteEmailPage;

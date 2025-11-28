"use client";

import { MailCheck } from "lucide-react";
import { useRegFormContext } from "@/app/contexts/RegFormContext";
import { useRouter } from "next/navigation";
import styles from "./SuccessSent.module.css";

export const SuccessSent = () => {
	const { regFormData } = useRegFormContext();
	const router = useRouter();

	return (
		<div className={styles.successContainer}>
			<div className={styles.successHeader}>
				<div className={styles.successIcon}>
					<MailCheck className={styles.icon} />
				</div>
				<div className="space-y-2">
					<h2 className={styles.successTitle}>Письмо отправлено!</h2>
					<p className={styles.successMessage}>
						Мы отправили email с подтверждением на{" "}
						<span className={styles.highlightedEmail}>{regFormData.email}</span>
						. Пожалуйста, проверьте и следуйте инструкциям.
					</p>
				</div>
			</div>

			<div className={styles.actionsContainer}>
				<button
					onClick={() => router.replace("/login")}
					className={styles.loginButton}
				>
					Перейти к авторизации
				</button>
			</div>
		</div>
	);
};

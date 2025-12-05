"use client";

import { MailCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "./SuccessChangeEmail.module.css";

export const SuccessChangeEmail = ({
	email,
	newEmail,
}: {
	email: string;
	newEmail: string;
}) => {
	const router = useRouter();

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.iconWrapper}>
					<MailCheck className={styles.icon} />
				</div>
				<div className={styles.textContent}>
					<h2 className={styles.title}>Письмо отправлено!</h2>
					<p className={styles.description}>
						Мы отправили email с подтверждением на прежнюю{" "}
						<span className={styles.oldEmail}>({email})</span> и новую{" "}
						<span className={styles.newEmail}> ({newEmail})</span> почту.{" "}
						Пожалуйста, проверьте и следуйте инструкциям.
					</p>
				</div>
			</div>

			<div className={styles.buttonContainer}>
				<button
					onClick={() => router.replace("/login")}
					className={styles.button}
				>
					Перейти к авторизации с новым email
				</button>
			</div>
		</div>
	);
};

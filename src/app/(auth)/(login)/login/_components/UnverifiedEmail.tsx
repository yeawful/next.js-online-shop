"use client";

import { AuthFormLayout } from "@/app/(auth)/_components/AuthFormLayout";
import { MailWarning, PlusCircle, HelpCircle, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "./UnverifiedEmail.module.css";

interface UnverifiedEmailProps {
	email: string;
	setLoginAction: (value: string) => void;
	setShowUnverifiedEmailAction: (value: boolean) => void;
}

export const UnverifiedEmail = ({
	email,
	setLoginAction,
	setShowUnverifiedEmailAction,
}: UnverifiedEmailProps) => {
	const router = useRouter();

	return (
		<AuthFormLayout>
			<div className={styles.container}>
				<MailWarning className={styles.icon} />

				<h2 className={styles.title}>
					Требуется <span className={styles.highlight}>подтверждение</span>
				</h2>

				<div className={styles.emailCard}>
					<p className={styles.emailLabel}>Письмо отправлено на:</p>
					<p className={styles.emailValue}>{email}</p>
					<p className={styles.emailHint}>
						Проверьте все папки, включая «Спам»
					</p>
				</div>

				<div className={styles.buttonsContainer}>
					<button
						onClick={() => {
							setLoginAction("");
							setShowUnverifiedEmailAction(false);
						}}
						className={`${styles.button} ${styles.buttonPrimary}`}
					>
						<span className={styles.buttonContent}>
							<PlusCircle className={styles.iconSmall} />
							<span className={styles.textOffset}>
								Подтвердить и войти заново
							</span>
						</span>
					</button>

					<button
						onClick={() => {
							setLoginAction("");
							setShowUnverifiedEmailAction(false);
						}}
						className={`${styles.button} ${styles.buttonSecondary}`}
					>
						<span className={styles.buttonContent}>
							<Search className={styles.searchIcon} />
							<span className={styles.textOffset}>
								Использовать другой email
							</span>
						</span>
					</button>

					<button
						onClick={() => {
							setLoginAction("");
							setShowUnverifiedEmailAction(false);
							router.replace("/contacts");
						}}
						className={`${styles.button} ${styles.buttonTertiary}`}
					>
						<span className={styles.buttonContent}>
							<HelpCircle className={styles.iconSmall} />
							<span className={styles.textOffset}>Связаться с поддержкой</span>
						</span>
					</button>
				</div>
			</div>
		</AuthFormLayout>
	);
};

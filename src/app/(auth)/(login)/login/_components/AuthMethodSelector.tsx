"use client";
import { AuthFormLayout } from "@/app/(auth)/_components/AuthFormLayout";
import { Smartphone, Key, ArrowLeft } from "lucide-react";
import styles from "./AuthMethodSelector.module.css";

interface AuthMethodSelectorProps {
	phoneNumber: string;
	onMethodSelectAction?: (method: "password" | "otp") => void;
	onBackAction?: () => void;
}

export const AuthMethodSelector: React.FC<AuthMethodSelectorProps> = ({
	phoneNumber,
	onMethodSelectAction = () => {},
	onBackAction = () => {},
}) => {
	return (
		<AuthFormLayout>
			<div className={styles.container}>
				<div className={styles.content}>
					<div className={styles.header}>
						<h2 className={styles.title}>Выберите способ входа</h2>
						<p className={styles.description}>
							Для номера {phoneNumber} доступны следующие варианты:
						</p>
					</div>

					<div className={styles.buttonsContainer}>
						<button
							onClick={() => onMethodSelectAction("password")}
							className={styles.button}
						>
							<div className={styles.iconContainer}>
								<Key className={styles.icon} />
							</div>
							<span className={styles.buttonText}>Войти с паролем</span>
						</button>

						<button
							onClick={() => onMethodSelectAction("otp")}
							className={styles.button}
						>
							<div className={styles.iconContainer}>
								<Smartphone className={styles.icon} />
							</div>
							<span className={styles.buttonText}>Войти по SMS-коду</span>
						</button>
					</div>

					<button onClick={onBackAction} className={styles.backButton}>
						<ArrowLeft className={styles.backIcon} />
						Вернуться
					</button>
				</div>
			</div>
		</AuthFormLayout>
	);
};

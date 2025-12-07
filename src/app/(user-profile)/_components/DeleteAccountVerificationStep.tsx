import { Loader2, Check, Trash2 } from "lucide-react";
import { AuthFormLayout } from "@/app/(auth)/_components/AuthFormLayout";
import styles from "./DeleteAccountVerificationStep.module.css";

interface DeleteAccountVerificationStepProps {
	phoneNumber?: string;
	code: string;
	error: string;
	verifying: boolean;
	canResend: boolean;
	timeLeft: number;
	onCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onVerify: (e: React.FormEvent) => void;
	onResend: () => void;
}

export const DeleteAccountVerificationStep = ({
	phoneNumber,
	code,
	error,
	verifying,
	canResend,
	timeLeft,
	onCodeChange,
	onVerify,
	onResend,
}: DeleteAccountVerificationStepProps) => {
	return (
		<AuthFormLayout>
			<div className={styles.container}>
				<div className={styles.iconContainer}>
					<Trash2 className={styles.trashIcon} />
					<h1 className={styles.title}>Последнее подтверждение</h1>
				</div>

				<p className={styles.warningText}>
					Вы собираетесь безвозвратно удалить свой аккаунт и все данные!
				</p>

				<p className={styles.description}>
					Введите код из SMS, отправленный на номер +{phoneNumber}
				</p>

				{error && <div className={styles.errorMessage}>{error}</div>}

				<div className={styles.formContainer}>
					<div className={styles.inputRow}>
						<input
							type="text"
							inputMode="numeric"
							pattern="[0-9]{4}"
							maxLength={4}
							value={code}
							onChange={onCodeChange}
							className={styles.codeInput}
							autoComplete="one-time-code"
							autoFocus
							required
						/>

						<button
							onClick={onVerify}
							disabled={code.length !== 4 || verifying}
							className={styles.deleteButton}
						>
							{verifying ? (
								<>
									<Loader2 className={styles.loaderIcon} />
									Удаление...
								</>
							) : (
								<>
									<Check className={styles.checkIcon} />
									Удалить аккаунт
								</>
							)}
						</button>
					</div>

					<button
						onClick={onResend}
						disabled={!canResend}
						className={styles.resendButton}
					>
						{canResend
							? "Отправить код повторно"
							: `Повторить отправку через: ${timeLeft} сек`}
					</button>
				</div>
			</div>
		</AuthFormLayout>
	);
};

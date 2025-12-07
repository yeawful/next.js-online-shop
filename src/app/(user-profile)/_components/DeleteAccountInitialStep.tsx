import { Loader2, Trash2, Mail } from "lucide-react";
import { AuthFormLayout } from "@/app/(auth)/_components/AuthFormLayout";
import styles from "./DeleteAccountInitialStep.module.css";

interface DeleteAccountInitialStepProps {
	loading: boolean;
	error: string;
	canResend: boolean;
	timeLeft: number;
	onSendCode: (e: React.FormEvent) => void;
}

export const DeleteAccountInitialStep = ({
	loading,
	error,
	canResend,
	timeLeft,
	onSendCode,
}: DeleteAccountInitialStepProps) => {
	return (
		<AuthFormLayout>
			<div className={styles.container}>
				<div className={styles.iconContainer}>
					<Trash2 className={styles.trashIcon} />
					<h1 className={styles.title}>Удаление аккаунта</h1>
				</div>

				<p className={styles.warningText}>
					Внимание! Это действие необратимо. Все Ваши данные будут удалены без
					возможности восстановления.
				</p>

				<p className={styles.description}>
					Для подтверждения удаления аккаунта мы отправим SMS с кодом на
					телефон, по которому Вы регистрировались.
				</p>

				{error && <div className={styles.errorMessage}>{error}</div>}

				<form onSubmit={onSendCode} className={styles.form} autoComplete="off">
					<button
						type="submit"
						disabled={loading || !canResend}
						className={styles.submitButton}
					>
						{loading ? (
							<>
								<Loader2 className={styles.loaderIcon} />
								Отправка...
							</>
						) : !canResend ? (
							`Ждите ${timeLeft} сек`
						) : (
							<>
								<Mail className={styles.mailIcon} />
								Получить код подтверждения
							</>
						)}
					</button>
				</form>
			</div>
		</AuthFormLayout>
	);
};

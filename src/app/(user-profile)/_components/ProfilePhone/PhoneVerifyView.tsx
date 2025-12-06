import styles from "./PhoneVerifyView.module.css";

interface PhoneVerifyViewProps {
	currentPhone: string;
	code: string;
	isSaving: boolean;
	onCodeChange: (value: string) => void;
	onVerify: () => void;
	canResend: boolean;
	timeLeft: number;
	onResendCode: () => void;
}

const PhoneVerifyView = ({
	currentPhone,
	code,
	isSaving,
	onCodeChange,
	onVerify,
	canResend,
	timeLeft,
	onResendCode,
}: PhoneVerifyViewProps) => {
	return (
		<div className={styles.verifyContainer}>
			<div className={styles.header}>
				<p className={styles.headerText}>
					Код подтверждения отправлен на +{currentPhone}
				</p>
			</div>

			<div className="flex flex-col gap-3">
				<div className={styles.inputRow}>
					<input
						type="text"
						inputMode="numeric"
						pattern="[0-9]{4}"
						maxLength={4}
						value={code}
						onChange={(e) => onCodeChange(e.target.value)}
						className={styles.codeInput}
						autoComplete="one-time-code"
					/>

					<button
						onClick={onVerify}
						disabled={code.length !== 4 || isSaving}
						className={styles.verifyButton}
					>
						{isSaving ? "Проверка..." : "Подтвердить"}
					</button>
				</div>
				<button
					onClick={onResendCode}
					disabled={!canResend}
					className={`${styles.resendButton} ${
						canResend ? styles.resendButtonActive : styles.resendButtonInactive
					}`}
				>
					{canResend
						? "Отправить снова..."
						: `Повторить отправку через ${timeLeft} сек`}
				</button>
			</div>
		</div>
	);
};

export default PhoneVerifyView;

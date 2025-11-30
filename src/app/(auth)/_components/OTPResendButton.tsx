"use client";
import styles from "./OTPResendButton.module.css";

const OTPResendCode = ({
	canResend,
	timeLeft,
	onResendAction,
}: {
	canResend: boolean;
	timeLeft: number;
	onResendAction: () => void;
}) => {
	return !canResend ? (
		<p className={styles.timerText}>
			Запросить код повторно можно через{" "}
			<span className={styles.timerBold}>{timeLeft} секунд</span>
		</p>
	) : (
		<button
			onClick={onResendAction}
			disabled={!canResend}
			className={styles.resendButton}
		>
			Отправить еще раз
		</button>
	);
};

export default OTPResendCode;

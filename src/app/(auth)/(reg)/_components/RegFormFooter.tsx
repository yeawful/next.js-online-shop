"use client";

import Link from "next/link";
import styles from "./RegFormFooter.module.css";

const RegFormFooter = ({
	isFormValid,
	isLoading,
}: {
	isFormValid: boolean;
	isLoading: boolean;
}) => {
	return (
		<>
			<button
				disabled={isLoading}
				type="submit"
				className={`${styles.submitButton} ${
					isFormValid ? styles.submitButtonActive : styles.submitButtonInactive
				}`}
			>
				Продолжить
			</button>
			<Link href="/login" className={styles.loginLink}>
				Вход
			</Link>
		</>
	);
};

export default RegFormFooter;

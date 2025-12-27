"use client";

import { ErrorProps } from "@/types/errorProps";
import styles from "./ErrorComponent.module.css";

export default function ErrorComponent({ error, userMessage }: ErrorProps) {
	console.error("Произошла ошибка:", error);

	return (
		<div className={styles.errorComponent}>
			<p>{userMessage || "Произошла ошибка. Пожалуйста, попробуйте позже."}</p>
			<button
				onClick={() => window.location.reload()}
				className={styles.retryButton}
			>
				Попробовать снова
			</button>
		</div>
	);
}

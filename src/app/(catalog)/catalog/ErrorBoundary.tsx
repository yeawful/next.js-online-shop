"use client";

import { useRouter } from "next/navigation";
import { startTransition } from "react";
import styles from "./ErrorBoundary.module.css";

export default function ErrorBoundary({
	error,
	reset,
}: {
	error: Error;
	reset: () => void;
}) {
	const router = useRouter();

	const handleRetry = () => {
		startTransition(() => {
			reset();
			router.refresh();
		});
	};

	return (
		<div className={styles.errorBoundary}>
			<p>Ошибка: {error.message}</p>
			<button onClick={handleRetry} className={styles.retryButton}>
				Попробовать снова
			</button>
		</div>
	);
}

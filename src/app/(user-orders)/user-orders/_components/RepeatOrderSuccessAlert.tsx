"use client";

import styles from "./RepeatOrderSuccessAlert.module.css";

export const RepeatOrderSuccessAlert: React.FC = () => {
	const handleRefresh = () => {
		window.location.reload();
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<p className={styles.message}>Повторный заказ успешно создан!</p>
				<button onClick={handleRefresh} className={styles.refreshButton}>
					Обновить страницу
				</button>
			</div>
		</div>
	);
};

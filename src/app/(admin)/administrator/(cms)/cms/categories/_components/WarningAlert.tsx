import styles from "./WarningAlert.module.css";

export const WarningAlert = () => {
	return (
		<div className={styles.container}>
			<p className={styles.message}>
				<strong>Внимание:</strong> Удаление категории допустимо только если в
				ней нет статей. При удалении категории все статьи должны быть перенесены
				в другие категории.
			</p>
		</div>
	);
};

import { RotateCw } from "lucide-react";
import styles from "./LoadingContent.module.css";

export const LoadingContent = ({ title }: { title: string }) => {
	return (
		<div className={styles.loadingContainer}>
			<div className={styles.spinnerContainer}>
				<RotateCw className={styles.spinnerIcon} />
				<div className={styles.spinnerPing}></div>
			</div>
			<div className={styles.loadingText}>
				<h3 className={styles.loadingTitle}>Отправка {title}</h3>
				<p>Пожалуйста, подождите...</p>
			</div>
		</div>
	);
};

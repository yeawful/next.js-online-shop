import { RotateCw } from "lucide-react";
import styles from "./LoadingContent.module.css";

export const LoadingContent = ({
	title,
}: {
	title: string | React.ReactNode;
}) => {
	return (
		<div className={styles.loadingContainer}>
			<div className={styles.spinnerContainer}>
				<RotateCw className={styles.spinnerIcon} />
				<div className={styles.spinnerPing}></div>
			</div>
			<div className={styles.loadingText}>
				<h3 className={styles.loadingTitle}>{title}</h3>
				<p>Пожалуйста, подождите...</p>
			</div>
		</div>
	);
};

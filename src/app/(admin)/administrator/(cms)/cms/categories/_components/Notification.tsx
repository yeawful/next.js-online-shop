import { X } from "lucide-react";
import styles from "./Notification.module.css";

interface NotificationProps {
	type: "success" | "error";
	message: string;
	onClose: () => void;
}

export const Notification = ({ type, message, onClose }: NotificationProps) => {
	const containerClass =
		type === "success"
			? `${styles.container} ${styles.containerSuccess}`
			: `${styles.container} ${styles.containerError}`;

	return (
		<div className={containerClass}>
			<div className={styles.messageContainer}>
				<span>{message}</span>
			</div>
			<button
				onClick={onClose}
				className={styles.closeButton}
				aria-label="Закрыть уведомление"
			>
				<X className={styles.closeIcon} />
			</button>
		</div>
	);
};

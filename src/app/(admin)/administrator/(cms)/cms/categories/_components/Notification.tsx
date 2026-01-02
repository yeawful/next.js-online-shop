import { X } from "lucide-react";
import { NotificationProps } from "../../types";
import styles from "./Notification.module.css";

export const Notification = ({ type, message, onClose }: NotificationProps) => {
	const typeClasses =
		type === "success" ? styles.notificationSuccess : styles.notificationError;

	return (
		<div className={`${styles.notification} ${typeClasses}`}>
			<div className={styles.content}>
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

import { AlertCircle } from "lucide-react";
import { ReactNode } from "react";
import styles from "./AlertMessage.module.css";

interface AlertMessageProps {
	type: "success" | "warning" | "error";
	message: ReactNode;
}

const AlertMessage = ({ type, message }: AlertMessageProps) => {
	return (
		<div className={`${styles.alert} ${styles[type]}`}>
			<AlertCircle className={styles.icon} />
			<span className={styles.message}>{message}</span>
		</div>
	);
};

export default AlertMessage;

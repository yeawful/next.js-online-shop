import styles from "./MessageAlert.module.css";

interface MessageAlertProps {
	message: string;
}

export default function MessageAlert({ message }: MessageAlertProps) {
	return <div className={styles.container}>{message}</div>;
}

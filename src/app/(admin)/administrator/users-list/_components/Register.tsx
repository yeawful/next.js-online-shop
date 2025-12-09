import { tableStyles } from "../../styles";
import styles from "./Register.module.css";

const Register = ({ createdAt }: { createdAt: string }) => {
	return (
		<div
			className={`${tableStyles.colSpans.registration} ${tableStyles.border.bottom} ${styles.container}`}
		>
			<div className={styles.label}>Регистрация:</div>
			<div className={styles.date}>
				{new Date(createdAt).toLocaleDateString("ru-RU")}
			</div>
			<div className={styles.time}>
				{new Date(createdAt).toLocaleTimeString("ru-RU")}
			</div>
		</div>
	);
};

export default Register;

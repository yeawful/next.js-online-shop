import { AuthFormLayout } from "../../_components/AuthFormLayout";
import { CheckCircle } from "lucide-react";
import styles from "./SuccessUpdatePass.module.css";

const SuccessUpdatePass = () => {
	return (
		<AuthFormLayout>
			<div className={styles.container}>
				<CheckCircle className={styles.icon} />
				<h1 className={styles.title}>Пароль успешно изменен!</h1>
				<p className={styles.description}>
					Вы будете перенаправлены на страницу входа...
				</p>
			</div>
		</AuthFormLayout>
	);
};

export default SuccessUpdatePass;

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./SuccessModal.module.css";

const SuccessModal = () => {
	const router = useRouter();

	useEffect(() => {
		const timer = setTimeout(() => {
			router.push("login");
		}, 3000);

		return () => clearTimeout(timer);
	}, [router]);

	return (
		<div className={styles.successOverlay}>
			<div className={styles.successContainer}>
				<h2 className={styles.successTitle}>Регистрация прошла успешно!</h2>
				<p className={styles.successMessage}>
					Сейчас вы будете перенаправлены на страницу входа
				</p>
				<div className={styles.progressContainer}>
					<div className={styles.progressBar}></div>
				</div>
			</div>
		</div>
	);
};

export default SuccessModal;

import { useAuthStore } from "@/store/authStore";
import { Key, ArrowRight, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./ProfilePassword.module.css";

const ProfilePassword = () => {
	const { user, logout } = useAuthStore();
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const isPhoneRegistered = user?.phoneNumberVerified === true;

	const handlePasswordChangeClick = () => {
		setIsModalOpen(true);
	};

	const handleConfirm = async () => {
		setIsModalOpen(false);
		await logout();

		if (isPhoneRegistered) {
			router.replace("/phone-pass-reset");
		} else {
			router.replace("/forgot-password");
		}
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const getModalText = () => {
		return isPhoneRegistered
			? "Для смены пароля будет использована SMS-верификация. Вы будете выведены из аккаунта. Продолжить?"
			: "Для смены пароля будет отправлено письмо с инструкциями на Ваш email. Вы будете выведены из аккаунта. Продолжить?";
	};

	return (
		<div className={styles.profilePasswordContainer}>
			<div className={styles.headerContainer}>
				<h3 className={styles.sectionTitle}>Пароль</h3>

				<button
					onClick={handlePasswordChangeClick}
					className={styles.editButton}
				>
					Сменить пароль
					<ArrowRight className={styles.arrowIcon} />
				</button>
			</div>

			<div className={styles.inputContainer}>
				<input
					type="text"
					value="********"
					className={styles.input}
					disabled
					readOnly
				/>
				<Key className={styles.keyIcon} />
			</div>

			{/* Модальное окно */}
			{isModalOpen && (
				<div className={styles.modalOverlay}>
					<div className={styles.modalContent}>
						<div className={styles.modalHeader}>
							<h3 className={styles.modalTitle}>Подтверждение смены пароля</h3>
							<button onClick={handleCancel} className={styles.closeButton}>
								<X className={styles.xIcon} />
							</button>
						</div>

						<p className={styles.modalText}>{getModalText()}</p>

						<div className={styles.modalButtonGroup}>
							<button onClick={handleCancel} className={styles.cancelButton}>
								Отмена
							</button>
							<button onClick={handleConfirm} className={styles.saveButton}>
								Продолжить
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProfilePassword;

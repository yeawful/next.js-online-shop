"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteAccountModal from "./DeleteAccountModal";
import styles from "./SecuritySection.module.css";

const SecuritySection: React.FC = () => {
	const [error, setError] = useState<string | null>(null);
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
	const { user, logout } = useAuthStore();
	const router = useRouter();

	const logoutFromProfile = () => {
		router.push("/");
	};

	const handleAppLogout = async () => {
		try {
			await logout();
			router.replace("/");
		} catch (error) {
			console.error("Ошибка при выходе:", error);
			setError("Не удалось выйти из приложения");
		}
	};

	const handleDeleteAccount = async () => {
		if (!user) return;
		if (user.phoneNumberVerified === true) {
			router.push("/verify-delete-phone");
		} else {
			router.push("/verify-delete-email");
		}
	};

	const handleOpenDeleteModal = () => {
		setError(null);
		setShowDeleteConfirm(true);
	};

	const handleCloseDeleteModal = () => {
		setError(null);
		setShowDeleteConfirm(false);
	};

	return (
		<>
			<div className={styles.container}>
				<h2 className={styles.title}>Безопасность</h2>
				{error && <div className={styles.error}>{error}</div>}
				<div className={styles.buttonsGrid}>
					<button
						onClick={logoutFromProfile}
						className={styles.logoutProfileButton}
					>
						Выйти из личного кабинета
					</button>
					<button onClick={handleAppLogout} className={styles.logoutAppButton}>
						Выйти из приложения
					</button>
					<button
						onClick={handleOpenDeleteModal}
						className={styles.deleteAccountButton}
					>
						Удалить аккаунт
					</button>
				</div>
			</div>
			<DeleteAccountModal
				isOpen={showDeleteConfirm}
				onClose={handleCloseDeleteModal}
				onConfirm={handleDeleteAccount}
				error={error}
			/>
		</>
	);
};

export default SecuritySection;

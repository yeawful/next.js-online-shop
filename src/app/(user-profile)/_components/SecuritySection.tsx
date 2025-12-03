"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteAccountModal from "./DeleteAccountModal";
import { LoadingContent } from "@/app/(auth)/(reg)/_components/LoadingContent";
import styles from "./SecuritySection.module.css";

const SecuritySection: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false);
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

		try {
			setIsLoading(true);
			setError(null);

			const response = await fetch("/api/auth/delete-account", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ userId: user.id }),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Не удалось удалить аккаунт");
			}

			logout();
			router.replace("/goodbye");
		} catch (error) {
			console.error("Ошибка при удалении аккаунта:", error);
			setError(
				error instanceof Error
					? error.message
					: "Не удалось удалить аккаунт. Попробуйте позже."
			);
		} finally {
			setIsLoading(false);
			setShowDeleteConfirm(false);
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

	if (isLoading) {
		return <LoadingContent title="Аккаунт удаляется " />;
	}

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

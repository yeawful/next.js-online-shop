import { useAuthStore } from "@/store/authStore";
import { Mail, Edit, AlertCircle } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { CONFIG } from "../../../../config/config";
import { AuthFormLayout } from "@/app/(auth)/_components/AuthFormLayout";
import { SuccessChangeEmail } from "./SuccessChangeEmail";
import { authClient } from "@/lib/auth-client";
import styles from "./ProfileEmail.module.css";

const ProfileEmail = () => {
	const [isEditing, setIsEditing] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [email, setEmail] = useState<string>("");
	const [showSuccess, setShowSuccess] = useState(false);
	const [error, setError] = useState("");
	const { user, fetchUserData } = useAuthStore();

	const isTempEmail = user?.email?.endsWith(CONFIG.TEMPORARY_EMAIL_DOMAIN);
	const hasNoEmail = !user?.email || user.email.trim() === "" || isTempEmail;
	const isPhoneRegistered = user?.phoneNumberVerified === true;

	useEffect(() => {
		if (user) {
			setEmail(isTempEmail ? "" : user.email || "");
		}
	}, [isTempEmail, user]);

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
		setError("");
	};

	const handleCancel = () => {
		setEmail(isTempEmail ? "" : user?.email || "");
		setIsEditing(false);
		setError("");
	};

	const handleSave = async () => {
		if (!user) return;

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setError("Пожалуйста, введите корректный email адрес");
			return;
		}

		const currentDisplayEmail = isTempEmail ? "" : user.email || "";
		if (email === currentDisplayEmail) {
			setError("Новый email совпадает с текущим");
			return;
		}

		setIsSaving(true);
		setError("");

		try {
			if (isPhoneRegistered) {
				const response = await fetch("/api/auth/update-email", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, userId: user.id }),
				});

				const data = await response.json();

				if (!response.ok) {
					setError(data.error);
					return;
				}

				await fetchUserData();
				alert("Email успешно обновлен!");
				setIsEditing(false);
			} else {
				const response = await authClient.changeEmail({
					newEmail: email,
					callbackURL: "/login",
				});

				if (response.error) {
					if (response.error.code === "COULDNT_UPDATE_YOUR_EMAIL") {
						throw new Error("Этот email уже используется другим пользователем");
					} else {
						throw new Error(response.error.message || "Ошибка при смене email");
					}
				}

				setShowSuccess(true);
				setIsEditing(false);
			}
		} catch (error) {
			console.error("Ошибка при сохранении:", error);

			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("Произошла неизвестная ошибка при смене email");
			}
		} finally {
			setIsSaving(false);
		}
	};

	if (showSuccess) {
		return (
			<AuthFormLayout>
				<SuccessChangeEmail email={user?.email || ""} newEmail={email} />
			</AuthFormLayout>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3 className={styles.sectionTitle}>Email</h3>
				{!isEditing ? (
					<button
						onClick={() => setIsEditing(true)}
						className={styles.editButton}
					>
						<Edit className={styles.editIcon} />
						Редактировать
					</button>
				) : (
					<div className={styles.buttonGroup}>
						<button onClick={handleCancel} className={styles.cancelButton}>
							Отмена
						</button>
						<button
							onClick={handleSave}
							className={styles.saveButton}
							disabled={isSaving}
						>
							{isSaving ? "Сохранение..." : "Сохранить"}
						</button>
					</div>
				)}
			</div>

			{hasNoEmail && !isEditing && (
				<div className={styles.alertWarning}>
					<AlertCircle className={styles.alertIcon} />
					<span className={styles.alertText}>
						Рекомендуем добавить email для получения уведомлений
					</span>
				</div>
			)}

			{isEditing && isPhoneRegistered && (
				<div className={styles.alertSuccess}>
					<AlertCircle className={styles.alertIcon} />
					<span className={styles.alertText}>
						Вы можете изменить email без подтверждения, так как были
						зарегистрированы по телефону
					</span>
				</div>
			)}

			{isEditing && !isPhoneRegistered && (
				<div className={styles.alertInfo}>
					<AlertCircle className={styles.alertIcon} />
					<span className={styles.alertText}>
						Для смены email потребуется подтверждение на прежнем и новом
						адресах.
					</span>
				</div>
			)}

			{error && (
				<div className={styles.alertError}>
					<AlertCircle className={styles.alertIcon} />
					<span className={styles.alertText}>{error}</span>
				</div>
			)}

			<div className={styles.inputContainer}>
				<input
					id="email"
					type="email"
					value={email}
					onChange={handleEmailChange}
					className={styles.input}
					placeholder="Введите ваш email"
					disabled={!isEditing}
				/>
				<Mail className={styles.inputIcon} />
			</div>
		</div>
	);
};

export default ProfileEmail;

"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { AuthFormLayout } from "../../_components/AuthFormLayout";
import { Loader2, MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import PasswordInput from "../../_components/PasswordInput";
import { isPasswordValid } from "../../../../utils/validation/passwordValid";
import SuccessUpdatePass from "./SuccessUpdatePass";
import styles from "./PhonePasswordResetVerify.module.css";

interface PhonePasswordResetVerifyProps {
	phone: string;
	loading: boolean;
	setLoadingAction: (loading: boolean) => void;
	error: string | null;
	setErrorAction: (error: string | null) => void;
	onBackAction: () => void;
}

export const PhonePasswordResetVerify = ({
	phone,
	loading,
	setLoadingAction,
	error,
	setErrorAction,
	onBackAction,
}: PhonePasswordResetVerifyProps) => {
	const router = useRouter();
	const [otp, setOtp] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [showNewPassword, setShowNewPassword] = useState(false);
	const [closeForm, setCloseForm] = useState(false);
	const [success, setSuccess] = useState(false);

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewPassword(e.target.value);
		setErrorAction(null);
	};

	const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOtp(e.target.value);
		setErrorAction(null);
	};

	const handleResetPassword = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoadingAction(true);
		setErrorAction(null);

		try {
			// 1. Сначала проверяем OTP через BetterAuth
			const { error: resetError } = await authClient.phoneNumber.resetPassword({
				phoneNumber: phone.replace(/\D/g, ""),
				otp,
				newPassword,
			});
			if (resetError) {
				if (resetError.message?.includes("Invalid OTP")) {
					setOtp("");
					throw new Error("Неверный код подтверждения");
				} else if (resetError.message?.includes("Too many attempts")) {
					setCloseForm(true);
					throw new Error(
						"Превышено количество попыток. Перейдите на страницу входа, чтобы начать заново, или измените номер телефона"
					);
				} else if (
					resetError.message?.includes("OTP expired") ||
					resetError.message?.includes("OTP not found")
				) {
					setCloseForm(true);
					throw new Error(
						"Просроченный или недействительный код подтверждения. Перейдите на страницу входа, чтобы начать заново, или измените номер телефона"
					);
				}
				throw new Error(resetError.message || "Неверный OTP код");
			}

			// 2. Если OTP верный, обновляем пароль в нашей БД
			const response = await fetch("/api/auth/reset-phone-pass", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					phoneNumber: phone.replace(/\D/g, ""),
					newPassword,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Не удалось обновить пароль в системе");
			}

			setSuccess(true);

			setTimeout(() => {
				router.replace("/login");
			}, 3000);
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Произошла ошибка";
			setErrorAction(errorMessage);
		} finally {
			setLoadingAction(false);
		}
	};

	const handleToLogin = () => {
		router.push("/login");
	};

	if (success) {
		return <SuccessUpdatePass />;
	}

	return (
		<AuthFormLayout>
			<div className={styles.container}>
				<div className={styles.header}>
					<MessageCircle className={styles.icon} />
					<h1 className={styles.title}>Введите код из SMS</h1>
				</div>

				<p className={styles.description}>
					Мы отправили 4-значный код на номер: <br />
					<span className={styles.phoneNumber}>{phone}</span>
				</p>

				{error && <div className={styles.error}>{error}</div>}
				{error &&
					(error.includes("Превышено количество попыток") ||
						error.includes("Просроченный или недействительный код")) && (
						<button onClick={handleToLogin} className={styles.loginButton}>
							Перейти на страницу входа
						</button>
					)}
				<button
					type="button"
					onClick={onBackAction}
					className={styles.backButton}
				>
					Изменить номер телефона
				</button>
				{!closeForm && (
					<form onSubmit={handleResetPassword} className={styles.form}>
						<div className={styles.otpSection}>
							<p className={styles.otpLabel}>Код из SMS</p>
							<input
								type="password"
								id="otp"
								pattern="[0-9]{4}"
								maxLength={4}
								inputMode="numeric"
								autoComplete="one-time-code"
								value={otp}
								onChange={handleOtpChange}
								className={styles.otpInput}
								required
							/>
						</div>

						<div className={styles.formRow}>
							<div className={styles.passwordGroup}>
								<PasswordInput
									id="password"
									label="Новый пароль"
									value={newPassword}
									onChangeAction={handlePasswordChange}
									showPassword={showNewPassword}
									togglePasswordVisibilityAction={() =>
										setShowNewPassword(!showNewPassword)
									}
									showRequirements={true}
									inputClass={`h-15 ${
										newPassword.length > 0 && !isPasswordValid(newPassword)
											? "border-red-500"
											: ""
									}`}
								/>
							</div>
						</div>

						<div className={styles.buttonContainer}>
							<button
								type="submit"
								disabled={loading}
								className={`${styles.button} ${loading ? styles.buttonInactive : styles.buttonActive}`}
							>
								{loading ? (
									<>
										<Loader2 className={styles.loader} />
										Сохранение...
									</>
								) : (
									"Установить новый пароль"
								)}
							</button>
						</div>
					</form>
				)}
			</div>
		</AuthFormLayout>
	);
};

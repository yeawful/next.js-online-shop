"use client";

import { useState } from "react";
import { AuthFormLayout } from "../../_components/AuthFormLayout";
import { InputMask } from "@react-input/mask";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoadingContent } from "../../(reg)/_components/LoadingContent";
import { ErrorContent } from "../../(reg)/_components/ErrorContent";
import { MailWarning, PhoneOff } from "lucide-react";
import { UnverifiedEmail } from "./_components/UnverifiedEmail";
import { AuthMethodSelector } from "./_components/AuthMethodSelector";
import styles from "./page.module.css";

const EnterLoginPage = () => {
	const [login, setLogin] = useState("");
	const [loginType, setLoginType] = useState<"email" | "phone">("email");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [showUnverifiedEmail, setShowUnverifiedEmail] = useState(false);
	const [showAuthMethodChoice, setShowAuthMethodChoice] = useState(false);
	const router = useRouter();

	const switchToEmail = () => {
		setLogin("");
		setLoginType("email");
	};

	const switchToPhone = () => {
		setLogin("");
		setLoginType("phone");
	};

	const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setLogin(value);
		setError(null);
	};

	const handleForgotPassword = () => {
		if (loginType === "phone") {
			router.replace(`/phone-pass-reset`);
		} else {
			router.replace("/forgot-password");
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			const response = await fetch("/api/auth/check-login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ login, loginType }),
			});

			const { exists, verified } = await response.json();

			if (!exists) {
				setError(
					loginType === "email"
						? "Аккаунт с таким email не существует"
						: "Аккаунт с таким телефоном не существует"
				);
				return;
			}

			if (!verified && loginType === "email") {
				setShowUnverifiedEmail(true);
				return;
			}

			if (!verified && loginType === "phone") {
				setError("Телефон не подтвержден. Зайдите по email");
				return;
			}

			if (loginType === "phone") {
				setShowAuthMethodChoice(true);
			} else {
				router.push(
					`/password-enter?login=${encodeURIComponent(login)}&loginType=${loginType}`
				);
			}
		} catch {
			setError("Ошибка при проверке данных");
		} finally {
			setIsLoading(false);
		}
	};

	const handleToRegister = () => router.replace("/register");

	const handleBackFromMethodChoice = () => {
		setShowAuthMethodChoice(false);
		setLogin("");
		setLoginType("phone");
	};

	const handleAuthMethodSelect = (method: "password" | "otp") => {
		const cleanLogin = login.replace(/\D/g, "");

		router.replace(
			method === "password"
				? `/password-enter?login=${encodeURIComponent(cleanLogin)}&loginType=phone`
				: `/otp-enter?login=${encodeURIComponent(cleanLogin)}&loginType=phone`
		);
	};

	const isButtonDisabled =
		(loginType === "email" && (!login.includes("@") || !login.includes("."))) ||
		(loginType === "phone" && login.replace(/\D/g, "").length < 11) ||
		isLoading;

	if (isLoading) {
		return (
			<AuthFormLayout>
				<LoadingContent
					title={
						<span style={{ whiteSpace: "pre-line" }}>
							{`Проверка ${loginType === "email" ? "email" : "телефона"}\n${login}`}
						</span>
					}
				/>
			</AuthFormLayout>
		);
	}

	if (error)
		return (
			<AuthFormLayout>
				<ErrorContent
					title="Упс!"
					error={error}
					icon={
						loginType === "email" ? (
							<MailWarning className={styles.errorIcon} />
						) : (
							<PhoneOff className={styles.errorIcon} />
						)
					}
					secondaryAction={{
						label: "Регистрация",
						onClick: handleToRegister,
					}}
				/>
			</AuthFormLayout>
		);

	if (showUnverifiedEmail) {
		return (
			<UnverifiedEmail
				email={login}
				setLoginAction={setLogin}
				setShowUnverifiedEmailAction={setShowUnverifiedEmail}
			/>
		);
	}

	if (showAuthMethodChoice) {
		return (
			<AuthMethodSelector
				phoneNumber={login}
				onBackAction={handleBackFromMethodChoice}
				onMethodSelectAction={handleAuthMethodSelect}
			/>
		);
	}

	return (
		<AuthFormLayout>
			<h1 className={styles.title}>Вход</h1>
			<form
				onSubmit={handleSubmit}
				className={styles.container}
				autoComplete="off"
			>
				<div className={styles.formRow}>
					<div className={styles.formGroup}>
						<div>
							<label htmlFor="login" className={styles.label}>
								{loginType === "email" ? "E-mail" : "Телефон"}
							</label>

							{loginType === "phone" ? (
								<InputMask
									mask="+7 (___) ___-__-__"
									replacement={{ _: /\d/ }}
									value={login}
									placeholder="+7 (___) ___-__-__"
									onChange={handleLoginChange}
									className={styles.input}
									required
								/>
							) : (
								<input
									type="email"
									value={login}
									placeholder="example@mail.com"
									onChange={handleLoginChange}
									className={styles.input}
									required
								/>
							)}
						</div>
						<div className={styles.authToggle}>
							<button
								type="button"
								onClick={switchToEmail}
								className={`${styles.toggleButton} ${loginType === "email" ? styles.toggleButtonActive : styles.toggleButtonInactive}`}
							>
								По email
							</button>
							<button
								type="button"
								onClick={switchToPhone}
								className={`${styles.toggleButton} ${loginType === "phone" ? styles.toggleButtonActive : styles.toggleButtonInactive}`}
							>
								По телефону
							</button>
						</div>
					</div>
				</div>
				<button
					type="submit"
					disabled={isButtonDisabled}
					className={`${styles.button} ${isButtonDisabled ? styles.buttonInactive : styles.buttonActive}`}
				>
					Вход
				</button>
				<div className={styles.navLinks}>
					<Link href="/register" className={styles.registerLink}>
						Регистрация
					</Link>
					<button onClick={handleForgotPassword} className={styles.forgotLink}>
						Забыли пароль?
					</button>
				</div>
			</form>
		</AuthFormLayout>
	);
};

export default EnterLoginPage;

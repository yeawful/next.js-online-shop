"use client";

import ErrorComponent from "@/components/error/ErrorComponent";
import { Loader } from "@/components/loaders/Loader";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PhoneInput from "../../_components/PhoneInput";
import PasswordInput from "../../_components/PasswordInput";
import Link from "next/link";
import { AuthFormLayout } from "../../_components/AuthFormLayout";
import styles from "./page.module.css";

const initialFormData = {
	phoneNumber: "+7",
	password: "",
};

const LoginPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<{
		error: Error;
		userMessage: string;
	} | null>(null);
	const [formData, setFormData] = useState(initialFormData);
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { id, value } = e.target;

		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			const res = await fetch("/api/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					phoneNumber: formData.phoneNumber.replace(/\D/g, ""),
					password: formData.password,
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.message || "Ошибка авторизации");
			}

			router.replace("/");
		} catch (error) {
			setError({
				error: error instanceof Error ? error : new Error("Неизвестная ошибка"),
				userMessage:
					(error instanceof Error && error.message) ||
					"Ошибка авторизации. Попробуйте снова",
			});
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) return <Loader />;
	if (error)
		return (
			<ErrorComponent error={error.error} userMessage={error.userMessage} />
		);

	return (
		<AuthFormLayout>
			<h1 className={styles.mainTitle}>Вход</h1>
			<form onSubmit={handleSubmit} autoComplete="off" className={styles.form}>
				<div className={styles.formRow}>
					<div className={styles.formColumn}>
						<PhoneInput
							value={formData.phoneNumber}
							onChangeAction={handleChange}
						/>
						<PasswordInput
							id="password"
							label="Пароль"
							value={formData.password}
							onChangeAction={handleChange}
							showPassword={showPassword}
							togglePasswordVisibilityAction={() =>
								setShowPassword(!showPassword)
							}
						/>
					</div>
				</div>
				<button
					type="submit"
					disabled={!(formData.phoneNumber && formData.password) || isLoading}
					className={`${styles.submitButton} ${
						formData.phoneNumber && formData.password
							? styles.submitButtonActive
							: styles.submitButtonInactive
					}`}
				>
					Вход
				</button>
				<div className={styles.linksContainer}>
					<Link href="/register" className={styles.registerLink}>
						Регистрация
					</Link>
					<Link href="forgotPassword" className={styles.forgotPasswordLink}>
						Забыли пароль?
					</Link>
				</div>
			</form>
		</AuthFormLayout>
	);
};

export default LoginPage;

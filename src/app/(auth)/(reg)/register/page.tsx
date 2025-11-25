"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PhoneInput from "../PhoneInput";
import PersonInput from "../PersonInput";
import PasswordInput from "../PasswordInput";
import styles from "./page.module.css";

const initialFormData = {
	phone: "+7",
	surname: "",
	firstName: "",
	password: "",
	confirmPassword: "",
	birthdayDate: "",
	region: "",
	location: "",
	gender: "",
	card: "",
	email: "",
	hasCard: false,
};

const RegisterPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<{
		error: Error;
		userMessage: string;
	} | null>(null);
	const [formData, setFormData] = useState(initialFormData);
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const handleClose = () => {
		setFormData(initialFormData);
		router.back();
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = () => {
		//
	};

	return (
		<div className={styles.registerPage}>
			<div className={styles.registerContainer}>
				<div className={styles.closeButtonContainer}>
					<button
						onClick={handleClose}
						className={styles.closeButton}
						aria-label="Закрыть"
					>
						<Image
							src="/icons-products/icon-closer.svg"
							width={24}
							height={24}
							alt="Закрыть"
						/>
					</button>
				</div>
				<h1 className={styles.title}>Регистрация</h1>
				<h2 className={styles.subtitle}>Обязательные поля</h2>
				<form
					onSubmit={handleSubmit}
					autoComplete="off"
					className={styles.form}
				>
					<div className={styles.formContent}>
						<div className={styles.formColumn}>
							<PhoneInput
								value={formData.phone}
								onChangeAction={handleChange}
							/>
							<PersonInput
								id="surname"
								label="Фамилия"
								value={formData.surname}
								onChange={handleChange}
							/>
							<PersonInput
								id="firstName"
								label="Имя"
								value={formData.firstName}
								onChange={handleChange}
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
								showRequirements={true}
							/>
							<PasswordInput
								id="confirmPassword"
								label="Подтвердите пароль"
								value={formData.confirmPassword}
								onChangeAction={handleChange}
								showPassword={showPassword}
								togglePasswordVisibilityAction={() =>
									setShowPassword(!showPassword)
								}
								compareWith={formData.password}
							/>
						</div>
						<div className={styles.formColumn}>
							Дата рождения Регион Населенный пункт Пол
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default RegisterPage;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PhoneInput from "../../PhoneInput";
import PersonInput from "../PersonInput";
import PasswordInput from "../../PasswordInput";
import DateInput from "../DateInput";
import SelectRegion from "../SelectRegion";
import SelectCity from "../SelectCity";
import GenderSelect from "../GenderSelect";
import CardInput from "../CardInput";
import CheckboxCard from "../CheckboxCard";
import EmailInput from "../EmailInput";
import RegFormFooter from "../RegFormFooter";
import { validateRegisterForm } from "../../../../utils/validation/form";
import { Loader } from "@/components/loaders/Loader";
import ErrorComponent from "@/components/error/ErrorComponent";
import SuccessModal from "../SuccessModal";
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
	const [invalidFormMessage, setInvalidFormMessage] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);
	const router = useRouter();

	const handleClose = () => {
		setFormData(initialFormData);
		router.back();
	};

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { id, type } = e.target;
		const value = type === "checkbox" ? e.target.checked : e.target.value;

		if (invalidFormMessage) {
			setInvalidFormMessage("");
		}

		if (id === "hasCard" && value === true) {
			setFormData((prev) => ({
				...prev,
				hasCard: true,
				card: "",
			}));

			return;
		}
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);
		setInvalidFormMessage("");

		const validation = validateRegisterForm(formData);
		if (!validation.isValid) {
			setInvalidFormMessage(
				validation.errorMessage || "Заполните поля корректно"
			);
			setIsLoading(false);
			return;
		}

		try {
			const [day, month, year] = formData.birthdayDate.split(".");
			const formattedBirthdayDate = new Date(`${year}-${month}-${day}`);

			const userData = {
				...formData,
				phone: formData.phone.replace(/\D/g, ""),
				birthdayDate: formattedBirthdayDate,
			};

			const res = await fetch("/api/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(userData),
			});

			if (!res.ok) {
				const data = await res.json();
				throw new Error(data.message || "Ошибка регистрации");
			}

			setIsSuccess(true);
		} catch (error) {
			setError({
				error: error instanceof Error ? error : new Error("Неизвестная ошибка"),
				userMessage: "Ошибка регистрации. Попробуйте снова",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const isFormValid = () => validateRegisterForm(formData).isValid;

	if (isLoading) return <Loader />;
	if (error)
		return (
			<ErrorComponent error={error.error} userMessage={error.userMessage} />
		);

	if (isSuccess) return <SuccessModal />;

	return (
		<div className={styles.registerOverlay}>
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
				<h1 className={styles.mainTitle}>Регистрация</h1>
				<h2 className={styles.sectionTitle}>Обязательные поля</h2>
				<form
					onSubmit={handleSubmit}
					autoComplete="off"
					className={styles.form}
				>
					<div className={styles.formRow}>
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
							<DateInput
								value={formData.birthdayDate}
								onChangeAction={(value) =>
									setFormData((prev) => ({ ...prev, birthdayDate: value }))
								}
							/>
							<SelectRegion
								value={formData.region}
								onChangeAction={handleChange}
							/>
							<SelectCity
								value={formData.location}
								onChangeAction={handleChange}
							/>
							<GenderSelect
								value={formData.gender}
								onChangeAction={(gender) =>
									setFormData((prev) => ({ ...prev, gender }))
								}
							/>
						</div>
					</div>
					<h2 className={`${styles.sectionTitle} ${styles.optionalSection}`}>
						Необязательные поля
					</h2>
					<div className={styles.optionalFormRow}>
						<div className={styles.cardColumn}>
							<CardInput
								value={formData.card}
								onChangeAction={handleChange}
								disabled={formData.hasCard}
							/>
							<CheckboxCard
								checked={formData.hasCard}
								onChangeAction={handleChange}
							/>
						</div>
						<EmailInput value={formData.email} onChangeAction={handleChange} />
					</div>
					{invalidFormMessage && (
						<div className={styles.errorMessage}>{invalidFormMessage}</div>
					)}
					<RegFormFooter isFormValid={isFormValid()} isLoading={isLoading} />
				</form>
			</div>
		</div>
	);
};

export default RegisterPage;

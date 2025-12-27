"use client";

import { useEffect, useState } from "react";
import PhoneInput from "../../_components/PhoneInput";
import PersonInput from "../_components/PersonInput";
import PasswordInput from "../../_components/PasswordInput";
import DateInput from "../_components/DateInput";
import SelectRegion from "../_components/SelectRegion";
import SelectCity from "../_components/SelectCity";
import GenderSelect from "../_components/GenderSelect";
import CardInput from "../_components/CardInput";
import CheckboxCard from "../_components/CheckboxCard";
import EmailInput from "../_components/EmailInput";
import RegFormFooter from "../_components/RegFormFooter";
import { validateRegisterForm } from "../../../../utils/validation/form";
import { Loader } from "@/components/ui/Loader";
import ErrorComponent from "@/components/ui/ErrorComponent";
import { initialRegFormData } from "@/constants/regFormData";
import { RegFormData } from "@/types/regFormData";
import { AuthFormLayout } from "../../_components/AuthFormLayout";
import { useRegFormContext } from "@/app/contexts/RegFormContext";
import { useRouter } from "next/navigation";
import VerificationMethodModal from "../_components/VerificationMethodModal";
import styles from "./page.module.css";

const RegisterPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<{
		error: Error;
		userMessage: string;
	} | null>(null);
	const [registerForm, setRegisterForm] =
		useState<RegFormData>(initialRegFormData);
	const [showPassword, setShowPassword] = useState(false);
	const [invalidFormMessage, setInvalidFormMessage] = useState("");
	const [isSuccess, setIsSuccess] = useState(false);
	const { setRegFormData } = useRegFormContext();
	const router = useRouter();

	useEffect(() => {
		if (isSuccess && !registerForm.email) {
			router.replace("/verify/verify-phone");
		}
	}, [isSuccess, registerForm.email, router]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { id, type } = e.target;
		const value = type === "checkbox" ? e.target.checked : e.target.value;

		if (invalidFormMessage) {
			setInvalidFormMessage("");
		}

		if (id === "hasCard" && value === true) {
			setRegisterForm((prev) => ({
				...prev,
				hasCard: true,
				card: "",
			}));

			return;
		}
		setRegisterForm((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);
		setInvalidFormMessage("");

		const validation = validateRegisterForm(registerForm);
		if (!validation.isValid) {
			setInvalidFormMessage(
				validation.errorMessage || "Заполните поля корректно"
			);
			setIsLoading(false);
			return;
		}

		try {
			const [day, month, year] = registerForm.birthdayDate.split(".");
			const formattedBirthdayDate = new Date(`${year}-${month}-${day}`);

			const userData = {
				...registerForm,
				phoneNumber: registerForm.phoneNumber.replace(/\D/g, ""),
				birthdayDate: formattedBirthdayDate.toISOString(),
			};

			setRegFormData(userData);

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

	const isFormValid = () => validateRegisterForm(registerForm).isValid;

	if (isLoading) return <Loader />;
	if (error)
		return (
			<ErrorComponent error={error.error} userMessage={error.userMessage} />
		);

	if (isSuccess && registerForm.email) return <VerificationMethodModal />;

	return (
		<AuthFormLayout variant="register">
			<h1 className={styles.mainTitle}>Регистрация</h1>
			<h2 className={styles.sectionTitle}>Обязательные поля</h2>
			<form onSubmit={handleSubmit} autoComplete="off" className={styles.form}>
				<div className={styles.formRow}>
					<div className={styles.formColumn}>
						<PhoneInput
							value={registerForm.phoneNumber}
							onChangeAction={handleChange}
						/>
						<PersonInput
							id="surname"
							label="Фамилия"
							value={registerForm.surname}
							onChange={handleChange}
						/>
						<PersonInput
							id="name"
							label="Имя"
							value={registerForm.name}
							onChange={handleChange}
						/>
						<PasswordInput
							id="password"
							label="Пароль"
							value={registerForm.password}
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
							value={registerForm.confirmPassword}
							onChangeAction={handleChange}
							showPassword={showPassword}
							togglePasswordVisibilityAction={() =>
								setShowPassword(!showPassword)
							}
							compareWith={registerForm.password}
						/>
					</div>
					<div className={styles.formColumn}>
						<DateInput
							value={registerForm.birthdayDate}
							onChangeAction={(value) =>
								setRegisterForm((prev) => ({ ...prev, birthdayDate: value }))
							}
						/>
						<SelectRegion
							value={registerForm.region}
							onChangeAction={handleChange}
						/>
						<SelectCity
							value={registerForm.location}
							onChangeAction={handleChange}
						/>
						<GenderSelect
							value={registerForm.gender}
							onChangeAction={(gender) =>
								setRegisterForm((prev) => ({ ...prev, gender }))
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
							value={registerForm.card}
							onChangeAction={handleChange}
							disabled={!!registerForm.hasCard}
						/>
						<CheckboxCard
							checked={registerForm.hasCard}
							onChangeAction={handleChange}
						/>
					</div>
					<EmailInput
						value={registerForm.email}
						onChangeAction={handleChange}
					/>
				</div>
				{invalidFormMessage && (
					<div className={styles.errorMessage}>{invalidFormMessage}</div>
				)}
				<RegFormFooter isFormValid={isFormValid()} isLoading={isLoading} />
			</form>
		</AuthFormLayout>
	);
};

export default RegisterPage;

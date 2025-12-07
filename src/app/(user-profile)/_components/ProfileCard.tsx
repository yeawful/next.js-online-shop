import { useAuthStore } from "@/store/authStore";
import { CreditCard, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { InputMask } from "@react-input/mask";
import {
	cleanCardNumber,
	isValidCardNumber,
	formatCardNumber,
} from "../../../utils/validation/validProfileCard";
import styles from "./ProfileCard.module.css";

const ProfileCard = () => {
	const { user, fetchUserData } = useAuthStore();
	const [isEditing, setIsEditing] = useState(false);
	const [cardNumber, setCardNumber] = useState(user?.card || "");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	useEffect(() => {
		if (user) {
			setCardNumber(user.card || "");
		}
	}, [user]);

	const handleEditClick = () => {
		setIsEditing(true);
		setCardNumber(user?.card || "");
		setError("");
	};

	const handleCancel = () => {
		setIsEditing(false);
		setCardNumber(user?.card || "");
		setError("");
	};

	const handleSave = async () => {
		const cleanedCardNumber = cleanCardNumber(cardNumber);

		if (!cleanedCardNumber.trim()) {
			setError("Номер карты не может быть пустым");
			return;
		}

		if (!isValidCardNumber(cleanedCardNumber)) {
			setError("Номер карты должен содержать 16 цифр");
			return;
		}

		setIsLoading(true);
		setError("");

		try {
			const response = await fetch("/api/users/update-card", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: user?.id,
					cardNumber: cleanedCardNumber,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				fetchUserData();
				setIsEditing(false);
			} else {
				setError(data.error || "Ошибка при обновлении карты");
			}
		} catch (error) {
			console.error(error);
			setError("Ошибка сети. Попробуйте еще раз.");
		} finally {
			setIsLoading(false);
		}
	};

	const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!isEditing) return;

		const value = e.target.value;
		const cleanValue = cleanCardNumber(value).slice(0, 16);
		setCardNumber(cleanValue);
	};

	const displayValue = formatCardNumber(cardNumber, isEditing);

	return (
		<div className={styles.profileCardContainer}>
			<div className={styles.headerContainer}>
				<h3 className={styles.sectionTitle}>Карта</h3>

				{!isEditing ? (
					<button onClick={handleEditClick} className={styles.editButton}>
						{user?.card ? "Изменить карту" : "Добавить карту"}
						<ArrowRight className={styles.arrowIcon} />
					</button>
				) : (
					<div className={styles.buttonGroup}>
						<button
							onClick={handleCancel}
							className={styles.cancelButton}
							disabled={isLoading}
						>
							Отмена
						</button>
						<button
							onClick={handleSave}
							className={styles.saveButton}
							disabled={isLoading}
						>
							{isLoading ? "Сохранение..." : "Сохранить"}
						</button>
					</div>
				)}
			</div>

			<div className={styles.inputContainer}>
				{isEditing ? (
					<InputMask
						mask="____ ____ ____ ____"
						replacement={{ _: /\d/ }}
						value={displayValue}
						onChange={handleCardNumberChange}
						placeholder="0000 0000 0000 0000"
						className={styles.input}
						disabled={isLoading}
					/>
				) : (
					<input
						type="text"
						value={displayValue || "Не указана"}
						className={styles.input}
						disabled
						readOnly
					/>
				)}
				<CreditCard className={styles.creditCardIcon} />
			</div>

			{error && <p className={styles.errorMessage}>{error}</p>}

			{!user?.card && !isEditing && (
				<p className={styles.hintText}>
					Добавьте номер карты лояльности для получения бонусов
				</p>
			)}
		</div>
	);
};

export default ProfileCard;

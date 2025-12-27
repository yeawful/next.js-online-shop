"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import IconStar from "@/components/ui/svg/IconStar";
import styles from "./AddReviewForm.module.css";

interface AddReviewFormProps {
	productId: string;
	onReviewAdded: () => void;
}

const AddReviewForm = ({ productId, onReviewAdded }: AddReviewFormProps) => {
	const [rating, setRating] = useState(0);
	const [hoverRating, setHoverRating] = useState(0);
	const [comment, setComment] = useState("");
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [showValidationError, setShowValidationError] = useState(false);
	const { user } = useAuthStore();

	const isFormValid = rating > 0 && comment.trim().length > 0;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!user) {
			setError("Необходимо авторизоваться");
			return;
		}

		if (!isFormValid) {
			setShowValidationError(true);
			return;
		}

		setSubmitting(true);
		setError("");
		setShowValidationError(false);

		try {
			const response = await fetch(`/api/products/${productId}/reviews`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					rating,
					comment,
					userId: user.id,
					userName: user.name,
				}),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.message || "Ошибка при отправке отзыва");
			}

			setComment("");
			setRating(0);
			onReviewAdded();
		} catch (err) {
			const errorMessage =
				err instanceof Error ? err.message : "Ошибка при отправке отзыва";
			setError(errorMessage);
			console.error("Ошибка отправки отзыва:", err);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className={styles.container}>
			<form onSubmit={handleSubmit}>
				<div className={styles.ratingSection}>
					<label className={styles.ratingLabel}>Ваша оценка</label>
					<div className={styles.starsContainer}>
						{[1, 2, 3, 4, 5].map((star) => (
							<button
								key={star}
								type="button"
								onClick={() => {
									setRating(star);
									setShowValidationError(false);
								}}
								onMouseEnter={() => setHoverRating(star)}
								onMouseLeave={() => setHoverRating(0)}
								className={styles.starButton}
							>
								<IconStar
									size={24}
									fillPercentage={
										hoverRating >= star ? 100 : rating >= star ? 100 : 0
									}
								/>
							</button>
						))}
					</div>
				</div>
				<div className={styles.formContent}>
					<div className={styles.textareaContainer}>
						<textarea
							id="comment"
							value={comment}
							onChange={(e) => {
								setComment(e.target.value);
								setShowValidationError(false);
							}}
							rows={4}
							className={styles.textarea}
							placeholder="Отзыв"
							style={{ resize: "vertical" }}
						/>
					</div>

					{/* Сообщение о необходимости заполнить все поля */}
					{showValidationError && (
						<div className={styles.validationError}>
							Пожалуйста, поставьте оценку и напишите отзыв
						</div>
					)}

					{/* Сообщение об ошибке авторизации или сервера */}
					{error && <div className={styles.serverError}>{error}</div>}
				</div>

				<button
					type="submit"
					disabled={submitting}
					className={`${styles.submitButton} ${submitting ? styles.submitting : ""}`}
				>
					{submitting ? "Отправка..." : "Отправить отзыв"}
				</button>
			</form>
		</div>
	);
};

export default AddReviewForm;

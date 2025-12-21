"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import StarRating from "@/components/products/StarRating/StarRating";
import ErrorComponent from "@/components/error/ErrorComponent";
import styles from "./ProductReviews.module.css";

interface Review {
	_id: string;
	userId: string;
	rating: number;
	comment: string;
	createdAt: string;
	updatedAt: string;
	userName: string;
}

interface ProductReviewsProps {
	productId: string;
	refreshKey?: number;
}

const ProductReviews = ({ productId, refreshKey = 0 }: ProductReviewsProps) => {
	const [reviews, setReviews] = useState<Review[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<{
		error: Error;
		userMessage: string;
	} | null>(null);

	const fetchReviews = async () => {
		try {
			setLoading(true);
			const response = await fetch(`/api/products/${productId}/reviews`);

			if (!response.ok) {
				throw new Error("Не удалось загрузить отзывы");
			}

			const data = await response.json();
			setReviews(data);
		} catch (error) {
			setError({
				error: error instanceof Error ? error : new Error("Неизвестная ошибка"),
				userMessage: "Не удалось загрузить отзывы",
			});
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchReviews();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productId, refreshKey]);

	if (loading) {
		return (
			<div>
				<h2 className={styles.title}>Отзывы</h2>
				<div className={styles.skeletonContainer}>
					{[...Array(3)].map((_, i) => (
						<div key={i} className={styles.skeletonItem}>
							<div className={styles.skeletonLineShort1}></div>
							<div className={styles.skeletonLineShort2}></div>
							<div className={styles.skeletonLineFull}></div>
							<div className={styles.skeletonLinePartial}></div>
						</div>
					))}
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<ErrorComponent error={error.error} userMessage={error.userMessage} />
		);
	}

	return (
		<div>
			<h2 className={styles.title}>Отзывы</h2>

			{reviews.length === 0 ? (
				<p className={styles.noReviews}>Пока нет отзывов. Будьте первым!</p>
			) : (
				<div className={styles.reviewsList}>
					{reviews.map((review) => {
						const userName = review.userName || "Неизвестный пользователь";
						return (
							<div key={review._id} className={styles.reviewItem}>
								<div className={styles.userInfo}>
									<div className={styles.userIconContainer}>
										<Image
											src="/icons-products/icon-user.svg"
											alt="Пользователь"
											width={16}
											height={16}
											className={styles.userIcon}
										/>
									</div>
									<span className={styles.userName}>{userName}</span>
								</div>

								<div className={styles.ratingInfo}>
									<StarRating rating={review.rating} />
									<span className={styles.reviewDate}>
										{new Date(review.createdAt).toLocaleDateString("ru-RU")}
									</span>
								</div>
								<p className={styles.reviewComment}>{review.comment}</p>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default ProductReviews;

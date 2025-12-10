import IconStar from "@/components/svg/IconStar";
import styles from "./RatingDistribution.module.css";

interface RatingDistributionProps {
	averageRating: number;
	distribution: {
		"1": number;
		"2": number;
		"3": number;
		"4": number;
		"5": number;
	};
}

const RatingDistribution = ({
	averageRating,
	distribution,
}: RatingDistributionProps) => {
	const totalReviews =
		distribution["1"] +
		distribution["2"] +
		distribution["3"] +
		distribution["4"] +
		distribution["5"];

	const renderStars = (rating: number) => {
		return (
			<div className={styles.starsRow}>
				{[1, 2, 3, 4, 5].map((star) => {
					const fillAmount = Math.max(0, Math.min(1, rating - (star - 1)));
					const fillPercentage = Math.round(fillAmount * 100);

					return <IconStar key={star} fillPercentage={fillPercentage} />;
				})}
			</div>
		);
	};

	if (totalReviews === 0) {
		return (
			<div className={styles.emptyState}>
				<div className={styles.emptyRating}>0 из 5</div>
				<div className={styles.emptyText}>Пока нет оценок</div>
			</div>
		);
	}

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.headerStars}>{renderStars(averageRating)}</div>
				<div className={styles.averageRating}>{averageRating} из 5</div>
			</div>

			<div className={styles.distribution}>
				{[5, 4, 3, 2, 1].map((rating) => (
					<div key={rating} className={styles.ratingRow}>
						<span className={styles.ratingNumber}>{rating}</span>
						<div className={styles.ratingStars}>{renderStars(rating)}</div>
						<span className={styles.ratingCount}>
							{distribution[rating as unknown as keyof typeof distribution]}
						</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default RatingDistribution;

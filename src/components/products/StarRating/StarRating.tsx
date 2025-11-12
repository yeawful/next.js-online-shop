import styles from "./StarRating.module.css";

const StarRating = ({ rating }: { rating: number }) => {
	return (
		<div className={styles.starRating}>
			{[1, 2, 3, 4, 5].map((star) => (
				<span
					key={star}
					className={`${styles.star} ${star <= rating ? styles.filled : ""} ${
						star > rating && star - rating < 1 ? styles.halfFilled : ""
					}`}
				>
					★
				</span>
			))}
			<span className={styles.ratingValue}>({rating})</span>
		</div>
	);
};

export default StarRating;

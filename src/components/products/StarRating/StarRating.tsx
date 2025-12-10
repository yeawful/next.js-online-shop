import IconStar from "@/components/svg/IconStar";
import styles from "./StarRating.module.css";

const StarRating = ({ rating = 5.0 }: { rating: number }) => {
	const stars = [];

	for (let i = 1; i <= 5; i++) {
		const fillAmount = Math.max(0, Math.min(1, rating - (i - 1)));
		const fillPercentage = Math.round(fillAmount * 100);

		stars.push(<IconStar key={i} fillPercentage={fillPercentage} />);
	}

	return <div className={styles.container}>{stars}</div>;
};

export default StarRating;

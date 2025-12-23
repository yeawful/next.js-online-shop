import { CheckCircle2 } from "lucide-react";
import styles from "./SEORecommendations.module.css";

export const SEORecommendations = ({
	recommendations,
}: {
	recommendations: string[];
}) => {
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>Рекомендации по SEO:</h3>
			<ul className={styles.list}>
				{recommendations.map((rec, index) => (
					<li key={index} className={styles.listItem}>
						<CheckCircle2 className={styles.checkIcon} />
						<span>{rec}</span>
					</li>
				))}
			</ul>
		</div>
	);
};

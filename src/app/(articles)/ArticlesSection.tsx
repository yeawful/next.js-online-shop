import ViewAllButton from "@/components/products/ViewAllButton";
import { ArticlesSectionProps } from "@/types/articlesSection";
import ArticleCard from "./ArticleCard";
import styles from "./ArticlesSection.module.css";

const ArticleSection = ({
	title,
	viewAllButton,
	articles,
}: ArticlesSectionProps) => {
	return (
		<section>
			<div className={styles.articleSection}>
				<div className={styles.articleHeader}>
					<h2 className={styles.articleTitle}>{title}</h2>
					{viewAllButton && (
						<ViewAllButton btnText={viewAllButton.text} href="/blog" />
					)}
				</div>
				<ul className={styles.articlesGrid}>
					{articles.map((article) => (
						<li key={article._id} className={styles.articleItem}>
							<ArticleCard {...article} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default ArticleSection;

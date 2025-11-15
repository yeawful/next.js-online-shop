import ViewAllButton from "@/components/products/ViewAllButton/ViewAllButton";
import { ArticlesSectionProps } from "@/types/articlesSection";
import ArticleCard from "./ArticleCard";
import styles from "./ArticlesSection.module.css";

const ArticleSection = ({
	title,
	viewAllButton,
	articles,
	compact = false,
}: ArticlesSectionProps) => {
	return (
		<section>
			<div
				className={`${styles.articleSection} ${
					!compact ? styles.articleSectionCompact : ""
				}`}
			>
				<div className={styles.articleHeader}>
					<h2 className={styles.articleTitle}>{title}</h2>
					<ViewAllButton
						btnText={viewAllButton.text}
						href={viewAllButton.href}
					/>
				</div>
				<ul className={styles.articlesGrid}>
					{articles.map((article, index) => (
						<li
							key={article._id}
							className={`${styles.articleItem} ${
								compact
									? `
                    ${index >= 4 ? styles.hiddenItem : ""}
                    ${index >= 3 ? styles.mdHidden : ""}
                    ${index >= 3 ? styles.xlBlock : ""}
                    ${index >= 4 ? styles.xlHidden : ""}
                  `
									: ""
							}`}
						>
							<ArticleCard {...article} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default ArticleSection;

import { ArticleCardProps } from "@/types/articlesListPageProps";
import Image from "next/image";
import styles from "./ArticleCard.module.css";

const ArticleCard = ({ img, title, createdAt, text }: ArticleCardProps) => {
	return (
		<article className={styles.articleCard}>
			<div className={styles.articleImageContainer}>
				<Image
					src={img}
					alt={title}
					fill
					className={styles.articleImage}
					quality={100}
					sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
				/>
			</div>
			<div className={styles.articleContent}>
				<time className={styles.articleDate}>
					{new Date(createdAt).toLocaleDateString("ru-RU")}
				</time>
				<h3 className={styles.articleTitle}>{title}</h3>
				<p className={styles.articleText}>{text}</p>
				<button className={styles.readMoreButton}>Подробнее</button>
			</div>
		</article>
	);
};

export default ArticleCard;

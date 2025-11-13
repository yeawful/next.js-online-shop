import Image from "next/image";
import iconRight from "../../../public/icons-header/icon-arrow-right.svg";
import articlesDatabase from "@/data/articlesDatabase.json";
import Link from "next/link";
import styles from "./Articles.module.css";

const Articles = () => {
	const articles = articlesDatabase;

	return (
		<section className={styles.articles}>
			<div className={styles.articlesContainer}>
				<div className={styles.articlesHeader}>
					<h2 className={styles.articlesTitle}>Статьи</h2>
					<Link href="#" className={styles.viewArticlesLink}>
						<p className={styles.viewArticlesText}>К статьям</p>
						<Image
							src={iconRight}
							alt="К статьям"
							width={24}
							height={24}
							sizes="24px"
						/>
					</Link>
				</div>

				<ul className={styles.articlesGrid}>
					{articles.map((article) => (
						<li key={article.id} className={styles.articleItem}>
							<article className={styles.articleCard}>
								<div className={styles.articleImageContainer}>
									<Image
										src={article.img}
										alt={article.title}
										fill
										className={styles.articleImage}
										quality={100}
										sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
									/>
								</div>
								<div className={styles.articleContent}>
									<time className={styles.articleDate}>
										{new Date(article.createdAt).toLocaleDateString("ru-RU")}
									</time>
									<h3 className={styles.articleTitle}>{article.title}</h3>
									<p className={styles.articleText}>{article.text}</p>
									<button className={styles.readMoreButton}>Подробнее</button>
								</div>
							</article>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default Articles;

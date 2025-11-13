import Image from "next/image";
import { Article } from "@/types/articles";
import styles from "./Articles.module.css";
import ViewAllButton from "../products/ViewAllButton/ViewAllButton";

const Articles = async () => {
	let articles: Article[] = [];
	let error = null;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL!}/api/articles`
		);
		articles = await res.json();
	} catch (err) {
		error = "Ошибка получения статей";
		console.error("Ошибка в компоненте Article:", err);
	}

	if (error) {
		return <div>Ошибка: {error}</div>;
	}

	return (
		<section className={styles.articles}>
			<div className={styles.articlesContainer}>
				<div className={styles.articlesHeader}>
					<h2 className={styles.articlesTitle}>Статьи</h2>
					<ViewAllButton btnText="К статьям" href="articles" />
				</div>

				<ul className={styles.articlesGrid}>
					{articles.map((article) => (
						<li key={article._id} className={styles.articleItem}>
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

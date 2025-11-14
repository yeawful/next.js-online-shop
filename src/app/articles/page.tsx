import Image from "next/image";
import { Article } from "@/types/articles";
import ViewAllButton from "../../components/products/ViewAllButton/ViewAllButton";
import styles from "./page.module.css";

const AllArticles = async () => {
	let articles: Article[] = [];
	let error = null;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL!}/api/articles`
		);
		articles = await res.json();
	} catch (err) {
		error = "Ошибка получения всех статей";
		console.error("Ошибка в компоненте AllArticle:", err);
	}

	if (error) {
		return <div className="text-red-500">Ошибка: {error}</div>;
	}

	return (
		<section className={styles.allArticles}>
			<div className={styles.allArticlesContainer}>
				<div className={styles.allArticlesHeader}>
					<h2 className={styles.allArticlesTitle}>Статьи</h2>
					<ViewAllButton btnText="На главную" href="/" />
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

export default AllArticles;

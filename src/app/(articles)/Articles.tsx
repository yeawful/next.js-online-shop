import fetchArticles from "./fetchArticles";
import ArticleSection from "./ArticlesSection";

const Articles = async () => {
	try {
		const articles = await fetchArticles();

		return (
			// eslint-disable-next-line react-hooks/error-boundaries
			<ArticleSection
				title="Статьи"
				viewAllButton={{ text: "Все статьи", href: "articles" }}
				articles={articles}
				compact
			/>
		);
	} catch {
		return <div className="error">Ошибка: не удалось загрузить статьи</div>;
	}
};

export default Articles;

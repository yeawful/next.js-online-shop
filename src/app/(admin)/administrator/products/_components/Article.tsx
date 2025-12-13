import styles from "./Article.module.css";

interface ArticleProps {
	article: string;
	onChangeAction: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Article = ({ onChangeAction, article }: ArticleProps) => {
	return (
		<div className={styles.container}>
			<label className={styles.label}>
				Артикул <span className={styles.required}>*</span>
			</label>
			<input
				type="number"
				name="article"
				min="0"
				max="999999"
				required
				value={article}
				onChange={onChangeAction}
				className={styles.input}
			/>
		</div>
	);
};

export default Article;

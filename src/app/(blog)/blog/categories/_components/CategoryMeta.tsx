import { BlogCategoryMetaProps } from "../types/categories.types";
import styles from "./CategoryMeta.module.css";

export default function CategoryMeta({
	createdAt,
	author,
}: BlogCategoryMetaProps) {
	const formattedDate = new Date(createdAt).toLocaleDateString("ru-RU", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});

	return (
		<div className={styles.metaContainer}>
			<time dateTime={createdAt} className={styles.date} title={formattedDate}>
				{formattedDate}
			</time>

			{author && (
				<div className={styles.authorContainer}>
					<div className={styles.dot}></div>
					<span className={styles.author}>{author}</span>
				</div>
			)}
		</div>
	);
}

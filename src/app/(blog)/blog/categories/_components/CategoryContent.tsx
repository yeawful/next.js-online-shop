import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogCategoryContentProps } from "../types/categories.types";
import CategoryMeta from "./CategoryMeta";
import styles from "./CategoryContent.module.css";

export default function CategoryContent({
	createdAt,
	author,
	name,
	description,
	slug,
}: BlogCategoryContentProps) {
	return (
		<div className={styles.content}>
			<CategoryMeta createdAt={createdAt} author={author} />
			<h2 className={styles.title}>{name}</h2>

			<p className={styles.description}>{description}</p>

			<div className={styles.footer}>
				<div className={styles.footerTop}>
					<div className={styles.footerLabel}>К статьям</div>
					<Link
						href={`/categories/${slug}`}
						className={styles.linkButton}
						aria-label={`Перейти к категории ${name}`}
					>
						<span className={styles.linkText}>Подробнее</span>
						<ArrowRight className={styles.icon} />
					</Link>
				</div>
			</div>
		</div>
	);
}

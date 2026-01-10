import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { BlogCategoryItemProps } from "../types/sidebar.types";
import styles from "./CategoryItem.module.css";
import animations from "./animations.module.css";

export default function CategoryItem({
	category,
	index,
	onClick,
}: BlogCategoryItemProps) {
	return (
		<Link
			href={`/blog/categories/${category.slug}`}
			onClick={onClick}
			className={styles.link}
		>
			<div
				className={`${styles.item} ${animations.slideIn}`}
				style={{ animationDelay: `${index * 0.03}s` }}
			>
				<div className={styles.content}>
					<div className={styles.mainContent}>
						<div className={styles.titleContainer}>
							<div className={styles.dot} />
							<h3 className={styles.title}>{category.name}</h3>
						</div>
						{category.description && (
							<p className={styles.description}>{category.description}</p>
						)}
						{category.articleCount !== undefined && (
							<div className={styles.articleCount}>
								<span className={styles.badge}>
									{category.articleCount} статей
								</span>
							</div>
						)}
					</div>
					<ChevronRight className={styles.arrow} />
				</div>
			</div>
		</Link>
	);
}

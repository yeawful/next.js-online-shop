import { BlogCategoryCardProps } from "../types/categories.types";
import { getColorFromName } from "../utils/getColorFromName";
import CategoryContent from "./CategoryContent";
import CategoryHoverEffect from "./CategoryHoverEffect";
import CategoryImage from "./CategoryImage";
import CategoryNewBadge from "./CategoryNewBadge";
import styles from "./CategoryCard.module.css";

export default function CategoryCard({
	category,
	priority = false,
}: BlogCategoryCardProps) {
	const hasImage = category.image && category.image.trim() !== "";
	const gradientClass = getColorFromName(category.name);
	const description =
		category.description || "Исследуйте материалы по этой теме";

	return (
		<article className={`${styles.card} group`}>
			<CategoryNewBadge createdAt={category.createdAt} />
			<CategoryImage
				hasImage={hasImage}
				image={category.image}
				imageAlt={category.imageAlt || category.name}
				gradientClass={gradientClass}
				name={category.name}
				priority={priority}
			/>
			<CategoryContent
				createdAt={category.createdAt}
				author={category.author}
				name={category.name}
				description={description}
				slug={category.slug}
			/>
			<CategoryHoverEffect />
		</article>
	);
}

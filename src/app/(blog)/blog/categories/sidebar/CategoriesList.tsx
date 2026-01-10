import { BlogCategoriesListProps } from "../types/sidebar.types";
import CategoryItem from "./CategoryItem";
import EmptyState from "./EmptyState";
import styles from "./CategoriesList.module.css";

export default function CategoriesList({
	categories,
	searchQuery,
	onItemClick,
}: BlogCategoriesListProps) {
	if (categories.length === 0) {
		return <EmptyState hasSearchQuery={!!searchQuery} />;
	}

	return (
		<div className={styles.listContainer}>
			{categories.map((category, index) => (
				<CategoryItem
					key={category._id}
					category={category}
					index={index}
					onClick={onItemClick}
				/>
			))}
		</div>
	);
}

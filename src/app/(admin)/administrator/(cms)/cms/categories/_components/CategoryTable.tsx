import { TableHeader } from "./TableHeader";
import { EmptyState } from "./EmptyState";
import { SortableItem } from "./SortableItem";
import { useCategoryStore } from "@/store/categoryStore";
import { Category, CategoryTableProps } from "../../types";
import styles from "./CategoryTable.module.css";

export const CategoryTable = ({ onDelete, onEdit }: CategoryTableProps) => {
	const { categories, loading } = useCategoryStore();

	const getDisplayNumericId = (category: Category): number | null => {
		return category.numericId;
	};

	if (loading) {
		return (
			<div className="p-8 text-center text-gray-500">Загрузка категорий...</div>
		);
	}

	return (
		<div className={styles.container}>
			<TableHeader />
			<div className={styles.divider}>
				{categories.length === 0 ? (
					<EmptyState />
				) : (
					categories.map((category) => {
						const categoryId = category._id.toString();

						return (
							<SortableItem
								key={categoryId}
								category={category}
								displayNumericId={getDisplayNumericId(category)}
								onDelete={onDelete}
								onEdit={onEdit}
							/>
						);
					})
				)}
			</div>
		</div>
	);
};

export default CategoryTable;

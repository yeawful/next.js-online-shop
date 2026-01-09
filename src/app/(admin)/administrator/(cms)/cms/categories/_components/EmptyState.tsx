import { useCategoryStore } from "@/store/categoryStore";
import styles from "./EmptyState.module.css";

export const EmptyState = () => {
	const { searchQuery } = useCategoryStore();
	return (
		<div className={styles.container}>
			{" "}
			{searchQuery
				? "Ничего не найдено по Вашему запросу"
				: "Категорий пока нет"}
		</div>
	);
};

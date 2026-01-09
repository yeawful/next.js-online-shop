import { useCategoryStore } from "@/store/categoryStore";
import styles from "./ReorderStatus.module.css";

export const ReorderStatus = () => {
	const { isReordering } = useCategoryStore();
	if (!isReordering) return null;

	return (
		<div className={styles.statusContainer}>
			<div className={styles.indicator}></div>
			Обновление порядка категорий...
		</div>
	);
};

import { TableHeader } from "./TableHeader";
import styles from "./CategoryTable.module.css";

const CategoryTable = () => {
	return (
		<div className={styles.container}>
			<TableHeader />
			<p>Вывод категорий</p>
		</div>
	);
};

export default CategoryTable;

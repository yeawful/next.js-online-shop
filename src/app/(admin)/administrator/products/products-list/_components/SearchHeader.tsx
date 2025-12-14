import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import styles from "./SearchHeader.module.css";

const SearchHeader = () => {
	return (
		<>
			<div className={styles.headerContainer}>
				<Link href="/administrator" className={styles.backLink}>
					<ArrowLeft size={20} />
					Назад в панель управления
				</Link>

				<Link
					href="/administrator/products/add-product"
					className={styles.addButton}
				>
					<Plus size={16} />
					Добавить товар
				</Link>
			</div>

			<h1 className={styles.title}>Поиск товаров</h1>
		</>
	);
};

export default SearchHeader;

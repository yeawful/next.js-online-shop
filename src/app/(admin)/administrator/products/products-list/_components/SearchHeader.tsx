import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import styles from "./SearchHeader.module.css";

const SearchHeader = () => {
	return (
		<>
			<div className={styles.container}>
				<Link href="/administrator" className={styles.backLink}>
					<ArrowLeft className={styles.backIcon} />
					Назад в панель управления
				</Link>

				<Link
					href="/administrator/products/add-product"
					className={styles.addProductLink}
				>
					<Plus className={styles.addIcon} />
					Добавить товар
				</Link>
			</div>

			<h1 className={styles.title}>Поиск товаров</h1>
		</>
	);
};

export default SearchHeader;

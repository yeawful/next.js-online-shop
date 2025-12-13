import Link from "next/link";
import styles from "./page.module.css";

const AdminProducts = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Панель управления</h1>

			<div className={styles.linksGrid}>
				<Link
					href="/administrator/products/add-product"
					className={styles.link}
				>
					Добавление товара
				</Link>
				<Link
					href="/administrator/products/products-list"
					className={styles.link}
				>
					Список товаров
				</Link>
				<Link
					href="/administrator/products/products-list"
					className={styles.link}
				>
					Редактирование товара
				</Link>
			</div>
		</div>
	);
};

export default AdminProducts;

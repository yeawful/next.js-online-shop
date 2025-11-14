import ProductCard from "../../components/products/ProductCard/ProductCard";
import { ProductCardProps } from "@/types/product";
import { shuffleArray } from "../../utils/shuffleArray";
import ViewAllButton from "../../components/products/ViewAllButton/ViewAllButton";
import styles from "./page.module.css";

const AllActions = async () => {
	let products: ProductCardProps[] = [];
	let error = null;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?category=actions`
		);
		products = await res.json();

		products = shuffleArray(products);
	} catch (err) {
		error = "Ошибка получения всех акционных продуктов";
		console.error("Ошибка в компоненте AllActions:", err);
	}

	if (error) {
		return <div className={styles.error}>Ошибка: {error}</div>;
	}

	return (
		<section>
			<div className={styles.allActions}>
				<div className={styles.allActionsHeader}>
					<h2 className={styles.allActionsTitle}>Все акции</h2>
					<ViewAllButton btnText="На главную" href="/" />
				</div>
				<ul className={styles.productsGrid}>
					{products.map((item) => (
						<li key={item._id}>
							<ProductCard {...item} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default AllActions;

import ProductCard from "../ProductCard/ProductCard";
import styles from "./NewProducts.module.css";
import { ProductCardProps } from "@/types/product";
import { shuffleArray } from "../../../utils/shuffleArray";
import ViewAllButton from "../ViewAllButton/ViewAllButton";

const NewProducts = async () => {
	let products: ProductCardProps[] = [];
	let error = null;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?category=new`
		);
		products = await res.json();

		products = shuffleArray(products);
	} catch (err) {
		error = "Ошибка получения новых продуктов";
		console.error("Ошибка в компоненте NewProducts:", err);
	}

	if (error) {
		return <div>Ошибка: {error}</div>;
	}

	return (
		<section className={styles.newProducts}>
			<div className={styles.newProductsContainer}>
				<div className={styles.newProductsHeader}>
					<h2 className={styles.newProductsTitle}>Новинки</h2>
					<ViewAllButton btnText="Все новинки" href="new" />
				</div>
				<ul className={styles.productsGrid}>
					{products.slice(0, 4).map((item, index) => (
						<li
							key={item._id}
							className={`
                ${index >= 4 ? styles.hiddenItem : ""}
                ${index >= 3 ? styles.mdHidden : ""}
                ${index >= 3 ? styles.xlBlock : ""}
                ${index >= 4 ? styles.xlHidden : ""}
              `}
						>
							<ProductCard {...item} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default NewProducts;

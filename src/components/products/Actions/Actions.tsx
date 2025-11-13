import ProductCard from "../ProductCard/ProductCard";
import styles from "./Actions.module.css";
import { ProductCardProps } from "@/types/product";
import { shuffleArray } from "../../../utils/shuffleArray";
import ViewAllButton from "../ViewAllButton/ViewAllButton";

const Actions = async () => {
	let products: ProductCardProps[] = [];
	let error = null;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?category=actions`
		);
		products = await res.json();

		products = shuffleArray(products);
	} catch (err) {
		error = "Ошибка получения акционных продуктов";
		console.error("Ошибка в компоненте Actions:", err);
	}

	if (error) {
		return <div>Ошибка: {error}</div>;
	}

	return (
		<section>
			<div className={styles.actionsContainer}>
				<div className={styles.actionsHeader}>
					<h2 className={styles.actionsTitle}>Акции</h2>
					<ViewAllButton btnText="Все акции" href="actions" />
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

export default Actions;

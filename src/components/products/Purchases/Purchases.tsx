import ProductCard from "../ProductCard/ProductCard";
import styles from "./Purchases.module.css";
import { ProductCardProps } from "@/types/product";
import ViewAllButton from "../ViewAllButton/ViewAllButton";

const Purchases = async () => {
	let purchases: ProductCardProps[] = [];
	let error = null;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL!}/api/users/purchases`
		);
		purchases = await res.json();
	} catch (err) {
		error = "Ошибка получения купленных продуктов";
		console.error("Ошибка в компоненте Purchases:", err);
	}

	if (error) {
		return <div className="text-red-500">Ошибка: {error}</div>;
	}

	return (
		<section className={styles.purchases}>
			<div className={styles.purchasesContainer}>
				<div className={styles.purchasesHeader}>
					<h2 className={styles.purchasesTitle}>Покупали раньше</h2>
					<ViewAllButton btnText="Все покупки" href="purchases" />
				</div>
				<ul className={styles.productsGrid}>
					{purchases.map((item, index) => (
						<li
							key={item.id}
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

export default Purchases;

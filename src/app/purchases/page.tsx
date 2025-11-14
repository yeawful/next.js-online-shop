import ProductCard from "../../components/products/ProductCard/ProductCard";
import { ProductCardProps } from "@/types/product";
import ViewAllButton from "../../components/products/ViewAllButton/ViewAllButton";
import styles from "./page.module.css";

const AllUserPurchases = async () => {
	let purchases: ProductCardProps[] = [];
	let error = null;

	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL!}/api/users/purchases`
		);
		purchases = await res.json();
	} catch (err) {
		error = "Ошибка получения всех купленных продуктов";
		console.error("Ошибка в компоненте AiiUserPurchases:", err);
	}

	if (error) {
		return <div className="text-red-500">Ошибка: {error}</div>;
	}

	return (
		<section className={styles.allUserPurchases}>
			<div className={styles.allUserPurchasesContainer}>
				<div className={styles.allUserPurchasesHeader}>
					<h2 className={styles.allUserPurchasesTitle}>Покупали раньше</h2>
					<ViewAllButton btnText="На главную" href="/" />
				</div>
				<ul className={styles.purchasesGrid}>
					{purchases.map((item) => (
						<li key={item.id}>
							<ProductCard {...item} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default AllUserPurchases;

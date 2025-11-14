import ProductCard from "../../components/products/ProductCard/ProductCard";
import { ProductCardProps } from "@/types/product";
import { shuffleArray } from "../../utils/shuffleArray";
import ViewAllButton from "../../components/products/ViewAllButton/ViewAllButton";
import styles from "./page.module.css";

const AllNew = async () => {
	let products: ProductCardProps[] = [];
	let error = null;
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/products?category=new`
		);
		products = await res.json();

		products = shuffleArray(products);
	} catch (err) {
		error = "Ошибка получения всех новинок";
		console.error("Ошибка в компоненте AllNew:", err);
	}

	if (error) {
		return <div className="text-red-500">Ошибка: {error}</div>;
	}

	return (
		<section className={styles.allNew}>
			<div className={styles.allNewContainer}>
				<div className={styles.allNewHeader}>
					<h2 className={styles.allNewTitle}>Все новинки</h2>
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

export default AllNew;

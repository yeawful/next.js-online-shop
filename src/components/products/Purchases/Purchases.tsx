import Image from "next/image";
import iconRight from "../../../../public/icons-header/icon-arrow-right.svg";
import ProductCard from "../ProductCard/ProductCard";
import database from "@/data/database.json";
import styles from "./Purchases.module.css";

const Purchases = () => {
	const userPurchases = database.users[0].purchases
		.map((purchase) => {
			const product = database.products.find(
				(product) => product.id === purchase.id
			);
			if (!product) return undefined;
			const { discountPercent, ...rest } = product;
			void discountPercent;
			return rest;
		})
		.filter((item) => item !== undefined);

	return (
		<section className={styles.purchases}>
			<div className={styles.purchasesContainer}>
				<div className={styles.purchasesHeader}>
					<h2 className={styles.purchasesTitle}>Покупали раньше</h2>
					<button className={styles.viewAllButton}>
						<p className={styles.viewAllText}>Все покупки</p>
						<Image
							src={iconRight}
							alt="К покупкам"
							width={24}
							height={24}
							sizes="24px"
						/>
					</button>
				</div>
				<ul className={styles.productsGrid}>
					{userPurchases.map((item, index) => (
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

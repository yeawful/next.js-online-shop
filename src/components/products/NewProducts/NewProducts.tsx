import Image from "next/image";
import iconRight from "/public/icons-products/icon-arrow-right.svg";
import ProductCard from "../ProductCard/ProductCard";
import database from "@/data/database.json";
import styles from "./NewProducts.module.css";

const NewProducts = () => {
	const newProducts = database.products.filter((p) =>
		p.categories?.includes("new")
	);

	return (
		<section className={styles.newProducts}>
			<div className={styles.newProductsContainer}>
				<div className={styles.newProductsHeader}>
					<h2 className={styles.newProductsTitle}>Новинки</h2>
					<button className={styles.viewAllButton}>
						<p className={styles.viewAllText}>Все новинки</p>
						<Image
							src={iconRight}
							alt="К новинкам"
							width={24}
							height={24}
							sizes="24px"
						/>
					</button>
				</div>
				<ul className={styles.productsGrid}>
					{newProducts.slice(0, 4).map((item, index) => (
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

export default NewProducts;

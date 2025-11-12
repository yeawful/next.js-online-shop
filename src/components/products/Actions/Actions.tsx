import Image from "next/image";
import iconRight from "/public/icons-products/icon-arrow-right.svg";
import ProductCard from "../ProductCard/ProductCard";
import database from "@/data/database.json";
import styles from "./Actions.module.css";

const Actions = () => {
	const actionProducts = database.products.filter((p) =>
		p.categories.includes("actions")
	);

	return (
		<section>
			<div className={styles.actionsContainer}>
				<div className={styles.actionsHeader}>
					<h2 className={styles.actionsTitle}>Акции</h2>
					<button className={styles.viewAllButton}>
						<p className={styles.viewAllText}>Все акции</p>
						<Image
							src={iconRight}
							alt="К акциям"
							width={24}
							height={24}
							sizes="24px"
						/>
					</button>
				</div>
				<ul className={styles.productsGrid}>
					{actionProducts.slice(0, 4).map((item, index) => (
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

export default Actions;

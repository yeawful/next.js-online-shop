import styles from "./ProductsSection.module.css";
import { ProductsSectionProps } from "@/types/productsSection";
import ViewAllButton from "../ViewAllButton/ViewAllButton";
import ProductCard from "../ProductCard/ProductCard";

const ProductsSection = ({
	title,
	viewAllButton,
	products,
	compact = false,
}: ProductsSectionProps) => {
	return (
		<section>
			<div
				className={`${styles.productsSection} ${
					!compact ? styles.compact : styles.margin
				}`}
			>
				<div className={styles.productsHeader}>
					<h2 className={styles.productsTitle}>{title}</h2>
					{viewAllButton && (
						<ViewAllButton
							btnText={viewAllButton.text}
							href={viewAllButton.href}
						/>
					)}
				</div>
				<ul className={styles.productsGrid}>
					{products.map((item, index) => (
						<li
							key={item._id}
							className={
								compact
									? `
                    ${index >= 4 ? styles.hiddenItem : ""}
                    ${index >= 3 ? styles.mdHidden : ""}
                    ${index >= 3 ? styles.xlBlock : ""}
                    ${index >= 4 ? styles.xlHidden : ""}
                  `
									: ""
							}
						>
							<ProductCard {...item} />
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default ProductsSection;

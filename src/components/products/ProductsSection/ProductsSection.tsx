import ProductCard from "../ProductCard/ProductCard";
import ViewAllButton from "../ViewAllButton/ViewAllButton";
import { ProductsSectionProps } from "@/types/productsSection";
import styles from "./ProductsSection.module.css";

const ProductsSection = ({
	title,
	viewAllButton,
	products,
	applyIndexStyles = true,
	contentType,
}: ProductsSectionProps & {
	applyIndexStyles?: boolean;
	contentType?: string;
}) => {
	const gridClass =
		contentType === "category"
			? styles.productsGridCategory
			: styles.productsGrid;

	return (
		<section>
			<div className={styles.productsSection}>
				<div className={styles.productsHeader}>
					<h2 className={styles.productsTitle}>{title}</h2>
					{viewAllButton && (
						<ViewAllButton
							btnText={viewAllButton.text}
							href={viewAllButton.href}
						/>
					)}
				</div>
				<ul className={gridClass}>
					{products.map((item, index) => (
						<li
							key={item._id}
							className={
								applyIndexStyles
									? index >= 3
										? `${styles.mdHidden} ${styles.xlBlock}`
										: ""
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

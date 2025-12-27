import ProductCard from "./ProductCard";
import ViewAllButton from "./ViewAllButton";
import { ProductsSectionProps } from "@/types/productsSection";
import styles from "./ProductsSection.module.css";

const ProductsSection = ({
	title,
	viewAllButton,
	products,
	applyIndexStyles = true,
	contentType,
	mobileItemsLimit = 4,
	isOrderPage,
	isAdminOrderPage,
}: ProductsSectionProps & {
	applyIndexStyles?: boolean;
	contentType?: string;
	isOrderPage?: boolean;
	isAdminOrderPage?: boolean;
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
				{products && products.length > 0 ? (
					<ul className={gridClass}>
						{products.map((item, index) => (
							<li
								key={item._id}
								className={
									applyIndexStyles
										? index >= mobileItemsLimit
											? `${styles.hiddenMdBlock} ${styles.mdHiddenXlBlock} ${styles.xlHidden}`
											: ""
										: ""
								}
							>
								<ProductCard
									{...item}
									isOrderPage={isOrderPage}
									isAdminOrderPage={isAdminOrderPage}
								/>
							</li>
						))}
					</ul>
				) : (
					<div className={styles.noProducts}>Товары не найдены</div>
				)}
			</div>
		</section>
	);
};

export default ProductsSection;

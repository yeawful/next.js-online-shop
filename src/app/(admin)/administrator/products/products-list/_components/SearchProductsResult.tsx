import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { TRANSLATIONS } from "../../../../../../utils/translations";
import { ProductCardProps } from "@/types/product";
import styles from "./SearchProductsResult.module.css";

interface SearchProductResultProps {
	products: ProductCardProps[];
	deletingId: number | null;
	onClearResults: () => void;
	onOpenDeleteModal: (productId: number, productTitle: string) => void;
}

const SearchProductResult = ({
	products,
	deletingId,
	onClearResults,
	onOpenDeleteModal,
}: SearchProductResultProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<p className={styles.resultsCount}>
					Найдено товаров: {products.length}
				</p>
				{products.length > 0 && (
					<button onClick={onClearResults} className={styles.clearButton}>
						Очистить результаты
					</button>
				)}
			</div>

			<div className={styles.productsGrid}>
				{products.length === 0 ? (
					<div className={styles.noResults}>
						<p className={styles.noResultsTitle}>Товары не найдены</p>
						<p className={styles.noResultsSubtitle}>
							Попробуйте изменить поисковый запрос
						</p>
					</div>
				) : (
					products.map((product) => (
						<div key={product.id} className={styles.productCard}>
							<div className={styles.productInfo}>
								<h3 className={styles.productTitle}>{product.title}</h3>
								<div className={styles.productDetails}>
									<p className={styles.productDetail}>
										Артикул: {product.article}
									</p>
									<p className={styles.productDetail}>
										Цена: {product.basePrice} руб.
									</p>
									<p className={styles.productDetail}>
										Остаток: {product.quantity} шт.
									</p>
									<p className={styles.productDetail}>
										Категории:{" "}
										{product.categories
											.map((cat) => TRANSLATIONS[cat] || cat)
											.join(", ") || "—"}
									</p>
								</div>
							</div>

							<div className={styles.actions}>
								<Link
									href={`/administrator/products/edit-product/${product.id}`}
									className={styles.editLink}
								>
									<Edit className={styles.icon} />
									Редактировать
								</Link>

								<button
									onClick={() => onOpenDeleteModal(product.id, product.title)}
									disabled={deletingId === product.id}
									className={styles.deleteButton}
								>
									<Trash2 className={styles.icon} />
									Удалить
								</button>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default SearchProductResult;

import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { TRANSLATIONS } from "../../../../../../utils/translations";
import styles from "./SearchProductResult.module.css";

interface Product {
	id: number;
	title: string;
	article: string;
	basePrice: number;
	quantity: number;
	categories: string[];
}

interface SearchProductResultProps {
	products: Product[];
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
		<div>
			<div className={styles.header}>
				<p className={styles.resultCount}>Найдено товаров: {products.length}</p>
				{products.length > 0 && (
					<button onClick={onClearResults} className={styles.clearButton}>
						Очистить результаты
					</button>
				)}
			</div>

			<div className={styles.productsGrid}>
				{products.length === 0 ? (
					<div className={styles.emptyState}>
						<p className={styles.emptyTitle}>Товары не найдены</p>
						<p className={styles.emptySubtitle}>
							Попробуйте изменить поисковый запрос
						</p>
					</div>
				) : (
					products.map((product) => (
						<div key={product.id} className={styles.productCard}>
							<div className={styles.productInfo}>
								<h3 className={styles.productTitle}>{product.title}</h3>
								<div className={styles.detailsGrid}>
									<p className={styles.detail}>Артикул: {product.article}</p>
									<p className={styles.detail}>
										Цена: {product.basePrice} руб.
									</p>
									<p className={styles.detail}>
										Остаток: {product.quantity} шт.
									</p>
									<p className={styles.detail}>
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
									className={styles.editButton}
								>
									<Edit size={16} />
									Редактировать
								</Link>

								<button
									onClick={() => onOpenDeleteModal(product.id, product.title)}
									disabled={deletingId === product.id}
									className={styles.deleteButton}
								>
									<Trash2 size={16} />
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

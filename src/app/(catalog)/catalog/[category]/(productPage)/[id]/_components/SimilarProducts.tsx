import Image from "next/image";
import Link from "next/link";
import { ProductCardProps } from "@/types/product";
import styles from "./SimilarProducts.module.css";

interface SimilarProductsProps {
	currentProduct: ProductCardProps;
}

interface SimilarProduct {
	id: string;
	title: string;
	img: string;
	basePrice: number;
	discountPercent: number;
	categories: string[];
}

const SimilarProducts = async ({ currentProduct }: SimilarProductsProps) => {
	try {
		const category = currentProduct.categories[0];

		if (!category) return null;

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/similar-products?productId=${currentProduct.id}&category=${category}&limit=4`,
			{
				next: { revalidate: 3600 },
			}
		);

		if (!response.ok) {
			throw new Error("Не удалось получить похожие продукты");
		}

		const data = await response.json();
		const similarProducts: SimilarProduct[] = data.similarProducts;

		if (similarProducts.length === 0) {
			return null;
		}

		const calculatePrice = (product: SimilarProduct) => {
			const discount = product.basePrice * (product.discountPercent / 100);
			return product.basePrice - discount;
		};

		return (
			<div className={styles.container}>
				<div className={styles.titleContainer}>
					<h3 className={styles.title}>Похожие</h3>
				</div>

				<div className={styles.productsGrid}>
					{similarProducts.map((product) => (
						<Link
							key={product.id}
							href={`/catalog/product/${product.id}`}
							className={styles.productCard}
						>
							<div className={styles.imageContainer}>
								<Image
									src={product.img}
									alt={product.title}
									fill
									className={styles.image}
									sizes="(max-width: 768px) 78px, (max-width: 1280px) 172px, 168px"
								/>
							</div>
							<div className={styles.price}>{calculatePrice(product)} ₽</div>
						</Link>
					))}
				</div>
			</div>
		);
	} catch (error) {
		console.error("Error fetching similar products:", error);
		return null;
	}
};

export default SimilarProducts;

import Image from "next/image";
import iconHeart from "/public/icons-header/icon-heart.svg";
import { ProductCardProps } from "@/types/product";
import { formatPrice } from "../../../utils/formatPrice";
import styles from "./ProductCard.module.css";
import StarRating from "../StarRating/StarRating";

const cardDiscountPercent = 6;

const ProductCard = ({
	img,
	description,
	basePrice,
	discountPercent = 0,
	rating,
	tags,
}: ProductCardProps) => {
	const calculateFinalPrice = (price: number, discount: number): number => {
		return discount > 0 ? price * (1 - discount / 100) : price;
	};

	const calculatePriceByCard = (price: number, discount: number): number => {
		return calculateFinalPrice(price, discount);
	};

	const isNewProduct = tags?.includes("new");

	const finalPrice = isNewProduct
		? basePrice
		: calculateFinalPrice(basePrice, discountPercent);

	const priceByCard = isNewProduct
		? basePrice
		: calculatePriceByCard(finalPrice, cardDiscountPercent);

	const ratingValue = rating?.rate || 5;

	return (
		<div className={styles.productCard}>
			<div className={styles.productImageContainer}>
				<Image
					src={img}
					alt="Акция"
					fill
					className={styles.productImage}
					priority={false}
					sizes="(max-width: 768px) 160px, (max-width: 1200px) 224px, 272px"
				/>
				<button className={styles.favoriteButton}>
					<Image
						src={iconHeart}
						alt="В избранное"
						width={24}
						height={24}
						sizes="24px"
					/>
				</button>
				{discountPercent > 0 && (
					<div className={styles.discountBadge}>-{discountPercent}%</div>
				)}
			</div>

			<div className={styles.cardContent}>
				<div className={styles.priceSection}>
					<div className={styles.priceContainer}>
						<div className={styles.currentPrice}>
							<span>{formatPrice(priceByCard)}</span>
							<span>₽</span>
						</div>
						{discountPercent > 0 && (
							<p className={styles.cardPriceLabel}>С картой</p>
						)}
					</div>
					{finalPrice !== basePrice && cardDiscountPercent > 0 && (
						<div className={styles.priceContainer}>
							<div className={styles.originalPrice}>
								<span>{formatPrice(finalPrice)}</span>
								<span>₽</span>
							</div>
							<p className={styles.cardPriceBasicLabel}>Обычная</p>
						</div>
					)}
				</div>
				<div className={styles.description}>{description}</div>
				{ratingValue > 0 && <StarRating rating={ratingValue} />}
				<button className={styles.addToCartButton}>В корзину</button>
			</div>
		</div>
	);
};

export default ProductCard;

import Image from "next/image";
import { ProductCardProps } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import StarRating from "../StarRating/StarRating";
import Link from "next/link";
import styles from "./ProductCard.module.css";
import { CONFIG } from "../../../../config/config";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import {
	calculateFinalPrice,
	calculatePriceByCard,
} from "../../../utils/calcPrices";
import AddToCartButton from "../AddToCartButton/AddToCartButton";

const cardDiscountPercent = CONFIG.CARD_DISCOUNT_PERCENT;

const ProductCard = ({
	id,
	img,
	description,
	basePrice,
	discountPercent = 0,
	rating,
	tags,
	categories,
	quantity,
}: ProductCardProps) => {
	const isNewProduct = tags?.includes("new");

	const finalPrice = isNewProduct
		? basePrice
		: calculateFinalPrice(basePrice, discountPercent);

	const priceByCard = isNewProduct
		? basePrice
		: calculatePriceByCard(finalPrice, cardDiscountPercent);

	const productId = id;
	const mainCategory = categories?.[0];

	const productUrl = `/catalog/${encodeURIComponent(mainCategory)}/${productId}?desc=${encodeURIComponent(description.substring(0, 50))}`;

	return (
		<div className={styles.productCard}>
			<FavoriteButton productId={productId.toString()} />
			<Link href={productUrl}>
				<div className={styles.productImageContainer}>
					<Image
						src={img}
						alt="Товар"
						fill
						className={styles.productImage}
						priority={false}
						sizes="(max-width: 768px) 160px, (max-width: 1280px) 224px, 272px"
					/>
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
								<p className={styles.cardPriceLabel}>Обычная</p>
							</div>
						)}
					</div>
					<div className={styles.description}>{description}</div>
					{
						<StarRating
							rating={rating && rating.count > 0 ? rating.rate : 5.0}
						/>
					}
				</div>
			</Link>
			<AddToCartButton
				productId={productId.toString()}
				availableQuantity={quantity}
			/>
		</div>
	);
};

export default ProductCard;

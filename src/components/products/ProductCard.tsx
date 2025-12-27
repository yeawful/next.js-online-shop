import Image from "next/image";
import { ProductCardProps } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import StarRating from "./StarRating";
import Link from "next/link";
import { CONFIG } from "../../../config/config";
import FavoriteButton from "./FavoriteButton";
import {
	calculateFinalPrice,
	calculatePriceByCard,
} from "../../utils/calcPrices";
import AddToCartButton from "./AddToCartButton";
import IconCart from "@/components/ui/svg/IconCart";
import { TRANSLATIONS } from "../../utils/translations";
import styles from "./ProductCard.module.css";

const cardDiscountPercent = CONFIG.CARD_DISCOUNT_PERCENT;

interface ExtendedProductCardProps extends ProductCardProps {
	index?: number;
	isAdminOrderPage?: boolean;
}

const ProductCard = ({
	id,
	img,
	description,
	basePrice,
	discountPercent = 0,
	rating,
	categories,
	quantity,
	orderQuantity,
	isLowStock,
	insufficientStock,
	isOrderPage = false,
	isAdminOrderPage,
	index = 0,
}: ExtendedProductCardProps) => {
	const finalPrice = calculateFinalPrice(basePrice, discountPercent);

	const priceByCard = calculatePriceByCard(finalPrice, cardDiscountPercent);

	const showTwoPrices =
		!isOrderPage && discountPercent > 0 && cardDiscountPercent > 0;

	const displayPrice = showTwoPrices ? priceByCard : finalPrice;

	const productId = id;
	const mainCategory = categories?.[0];

	const productUrl = `/catalog/${encodeURIComponent(mainCategory)}/${productId}`;

	const isPriorityImage = index < 4;

	return (
		<div className={isAdminOrderPage ? styles.cardAdmin : styles.cardStandard}>
			{orderQuantity && (
				<div className={styles.quantityIndicator}>
					<IconCart />
					{orderQuantity}
				</div>
			)}

			{(isLowStock || insufficientStock) && (
				<div
					className={`${styles.stockIndicator} ${
						insufficientStock ? styles.outOfStock : styles.lowStock
					}`}
				>
					{insufficientStock ? "Нет в наличии" : `Осталось: ${quantity}`}
				</div>
			)}

			{!isAdminOrderPage && <FavoriteButton productId={productId.toString()} />}
			<Link href={productUrl}>
				<div className={styles.productImageContainer}>
					<Image
						src={img}
						alt="Товар"
						fill
						className={styles.productImage}
						priority={isPriorityImage}
						sizes="(max-width: 768px) 160px, (max-width: 1280px) 224px, 272px"
					/>
					{!isAdminOrderPage && !isOrderPage && discountPercent > 0 && (
						<div className={styles.discountBadge}>-{discountPercent}%</div>
					)}
				</div>

				<div
					className={isAdminOrderPage ? styles.contentAdmin : styles.content}
				>
					{!isAdminOrderPage && (
						<div className={styles.priceSection}>
							<div className={styles.priceContainer}>
								<div className={styles.currentPrice}>
									<span>{formatPrice(displayPrice)}</span>
									<span>₽</span>
								</div>
								{showTwoPrices && (
									<p className={styles.cardPriceLabel}>С картой</p>
								)}
							</div>
							{showTwoPrices && (
								<div className={styles.priceContainer}>
									<div className={styles.originalPrice}>
										<span>{formatPrice(finalPrice)}</span>
										<span>₽</span>
									</div>
									<p className={styles.cardPriceLabel}>Обычная</p>
								</div>
							)}
						</div>
					)}
					{isAdminOrderPage && (
						<div className={styles.adminCategory}>
							{TRANSLATIONS[categories[0]]}
						</div>
					)}
					<div className={styles.description}>{description}</div>
					{!isAdminOrderPage && (
						<StarRating
							rating={rating && rating.count > 0 ? rating.rate : 5.0}
						/>
					)}
				</div>
			</Link>
			{!isAdminOrderPage && (
				<AddToCartButton
					productId={productId.toString()}
					availableQuantity={quantity}
				/>
			)}
		</div>
	);
};

export default ProductCard;

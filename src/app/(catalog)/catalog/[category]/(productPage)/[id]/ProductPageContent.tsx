import Image from "next/image";
import { ProductCardProps } from "@/types/product";
import { CONFIG } from "../../../../../../../config/config";
import StarRating from "@/components/products/StarRating/StarRating";
import { getReviewsWord } from "../../../../../../utils/reviewsWord";
import ShareButton from "./_components/ShareButton";
import ImagesBlock from "./_components/ImagesBlock";
import ProductOffer from "./_components/ProductOffer";
import CartButton from "./_components/CartButton";
import Bonuses from "./_components/Bonuses";
import DiscountMessage from "./_components/DiscountMessage";
import AdditionalInfo from "./_components/AdditionalInfo";
import SimilarProducts from "./_components/SimilarProducts";
import SameBrandProducts from "./_components/SameBrandProducts";
import RatingDistribution from "./_components/RatingDistribution";
import ReviewsWrapper from "./_components/ReviewsWrapper";
import Actions from "@/app/(products)/Actions";
import styles from "./ProductPageContent.module.css";

interface ProductPageContentProps {
	product: ProductCardProps;
	productId: string;
}

const ProductPageContent = ({
	product,
	productId,
}: ProductPageContentProps) => {
	const discountedPrice = product.discountPercent
		? product.basePrice * (1 - product.discountPercent / 100)
		: product.basePrice;

	const cardPrice = discountedPrice * (1 - CONFIG.CARD_DISCOUNT_PERCENT / 100);
	const bonusesAmount = cardPrice * 0.05;

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{product.description}</h1>
			<div className={styles.header}>
				<div className={styles.article}>арт. {product.article}</div>
				<div className={styles.ratingSection}>
					<StarRating rating={product.rating.rate || 5} />
					<p className={styles.reviewsCount}>
						{product.rating.count || 0}{" "}
						{getReviewsWord(product.rating.count || 0)}
					</p>
				</div>
				<ShareButton title={product.title} />
				<button className={styles.favoriteButton}>
					<Image
						src="/icons-header/icon-heart.svg"
						alt="Избранное"
						width={24}
						height={24}
						className={styles.favoriteIcon}
					/>
					<p className={styles.favoriteText}>В избранное</p>
				</button>
			</div>
			<div className={styles.content}>
				<div className={styles.mainContent}>
					<ImagesBlock product={product} />
					<div className={styles.sidebar}>
						<ProductOffer
							discountedPrice={discountedPrice}
							cardPrice={cardPrice}
						/>
						<CartButton />
						<Bonuses bonus={bonusesAmount} />
						<DiscountMessage
							productId={productId.toString()}
							productTitle={product.title}
							currentPrice={discountedPrice.toString()}
						/>
						<AdditionalInfo
							brand={product.brand}
							manufacturer={product.manufacturer}
							weight={product.weight}
						/>
					</div>
					<SimilarProducts currentProduct={product} />
				</div>
				<SameBrandProducts currentProduct={product} />
				<div className={styles.reviewsSection}>
					<h2 className={styles.reviewsTitle}>Отзывы</h2>
					<div className={styles.reviewsContainer}>
						<RatingDistribution
							averageRating={product.rating.rate}
							distribution={product.rating.distribution}
						/>
						<ReviewsWrapper productId={productId} />
					</div>
				</div>
				<Actions randomLimit={6} mobileItemsLimit={6} />
			</div>
		</div>
	);
};

export default ProductPageContent;

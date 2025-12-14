import { ProductCardProps } from "@/types/product";
import { CONFIG } from "../../../../../../../config/config";
import {
	calculateFinalPrice,
	calculatePriceByCard,
} from "../../../../../../utils/calcPrices";
import StarRating from "@/components/products/StarRating/StarRating";
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
import FavoriteButton from "@/components/products/FavoriteButton/FavoriteButton";
import { getFullEnding } from "../../../../../../utils/getWordEnding";
import styles from "./ProductPageContent.module.css";

interface ProductPageContentProps {
	product: ProductCardProps;
	productId: string;
}

const ProductPageContent = ({
	product,
	productId,
}: ProductPageContentProps) => {
	const priceWithDiscount = calculateFinalPrice(
		product.basePrice,
		product.discountPercent || 0
	);

	const cardPrice = calculatePriceByCard(
		priceWithDiscount,
		CONFIG.CARD_DISCOUNT_PERCENT
	);

	const bonusesAmount = Math.round(
		(priceWithDiscount * CONFIG.BONUSES_PERCENT) / 100
	);

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{product.description}</h1>
			<div className={styles.productHeader}>
				<div className={styles.article}>арт. {product.article}</div>
				<div className={styles.ratingContainer}>
					<StarRating rating={product.rating.rate || 5} />
					<p className={styles.reviewsCount}>
						{product.rating.count || 0}{" "}
						{`отзыв${getFullEnding(product.rating.count || 0)}`}
					</p>
				</div>
				<ShareButton title={product.title} />
				<FavoriteButton productId={productId} />
			</div>
			<div className={styles.contentWrapper}>
				<div className={styles.mainContent}>
					<ImagesBlock product={product} />
					<div className={styles.infoColumn}>
						<ProductOffer
							discountedPrice={priceWithDiscount}
							cardPrice={cardPrice}
						/>
						<CartButton productId={productId} />
						<Bonuses bonus={bonusesAmount} />
						<DiscountMessage
							productId={productId.toString()}
							productTitle={product.title}
							currentPrice={priceWithDiscount.toString()}
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
				<div>
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

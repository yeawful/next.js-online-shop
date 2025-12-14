import Image from "next/image";
import { CONFIG } from "../../../../../../../../config/config";
import { formatPrice } from "../../../../../../../utils/formatPrice";
import styles from "./ProductOffer.module.css";

interface ProductOfferProps {
	discountedPrice: number;
	cardPrice: number;
}

const ProductOffer = ({ discountedPrice, cardPrice }: ProductOfferProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.normalPriceSection}>
				<p className={styles.normalPrice}>{formatPrice(discountedPrice)} ₽ ₽</p>
				<p className={styles.normalPriceLabel}>Обычная цена</p>
			</div>

			<div className={styles.cardPriceSection}>
				<p className={styles.cardPrice}>{formatPrice(cardPrice)} ₽</p>
				<div className={styles.cardInfo}>
					<p className={styles.cardLabel}>С картой Северяночки</p>
					<div className={styles.tooltipContainer}>
						<Image
							src="/icons-products/icon-info.svg"
							alt="Информация"
							width={16}
							height={16}
							className={styles.infoIcon}
						/>
						<div className={styles.tooltip}>
							Скидка {CONFIG.CARD_DISCOUNT_PERCENT}% по карте лояльности
							«Северяночка». Оформите карту на кассе или закажите с курьером!
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductOffer;

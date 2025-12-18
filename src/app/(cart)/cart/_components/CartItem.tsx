"use client";

import { useState, memo, useEffect } from "react";
import Link from "next/link";
import { CONFIG } from "../../../../../config/config";
import {
	calculateFinalPrice,
	calculatePriceByCard,
} from "../../../../utils/calcPrices";
import { formatPrice } from "../../../../utils/formatPrice";
import Tooltip from "@/components/tooltip/Tooltip";
import CartSkeletons from "./CartSkeletons";
import SelectionCheckbox from "./SelectionCheckbox";
import ProductImage from "./ProductImage";
import PriceDisplay from "./PriceDisplay";
import QuantitySelector from "./QuantitySelector";
import DiscountBadge from "./DiscountBadge";
import { CartItemProps } from "@/types/cart";
import { useCartStore } from "@/store/cartStore";
import styles from "./CartItem.module.css";

const CartItem = memo(function CartItem({
	item,
	productData,
	isSelected,
	onSelectionChange,
	onQuantityUpdate,
}: CartItemProps) {
	const [quantity, setQuantity] = useState(item.quantity);
	const [isUpdating, setIsUpdating] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);
	const { hasLoyaltyCard } = useCartStore();

	useEffect(() => {
		if (!productData) return;

		const maxQuantity = productData.quantity;

		if (quantity > maxQuantity) {
			console.log(`Корректируем количество: ${quantity} → ${maxQuantity}`);
			setQuantity(maxQuantity);
			onQuantityUpdate(item.productId, maxQuantity);
		}
	}, [productData, quantity, item.productId, onQuantityUpdate]);

	const handleQuantityChange = async (newQuantity: number) => {
		if (newQuantity < 0) return;
		if (!productData) return;

		const maxQuantity = productData.quantity;

		if (newQuantity > maxQuantity) {
			setShowTooltip(true);
			setTimeout(() => setShowTooltip(false), 3000);
			return;
		}

		setIsUpdating(true);
		const previousQuantity = quantity;
		setQuantity(newQuantity);

		try {
			onQuantityUpdate(item.productId, newQuantity);
		} catch (error) {
			console.error("Ошибка обновления количества:", error);
			setQuantity(previousQuantity);
		} finally {
			setIsUpdating(false);
		}
	};

	if (!productData) {
		return <CartSkeletons />;
	}

	const priceWithDiscount = calculateFinalPrice(
		productData?.basePrice || 0,
		productData?.discountPercent || 0
	);

	const finalPrice = hasLoyaltyCard
		? calculatePriceByCard(priceWithDiscount, CONFIG.CARD_DISCOUNT_PERCENT)
		: priceWithDiscount;

	const totalFinalPrice = finalPrice * quantity;
	const totalPriceWithoutCard = priceWithDiscount * quantity;
	const isOutOfStock = productData?.quantity === 0;
	const hasDiscount = productData ? productData.discountPercent > 0 : false;

	return (
		<div
			className={`${styles.container} ${isOutOfStock ? styles.containerOutOfStock : ""}`}
		>
			<SelectionCheckbox
				isSelected={isSelected}
				onSelectionChange={(checked) =>
					onSelectionChange(item.productId, checked)
				}
			/>
			<div className={styles.contentWrapper}>
				<div className={styles.productSection}>
					<ProductImage productId={item.productId} title={productData.title} />

					<div className={styles.details}>
						<Link
							className={styles.productLink}
							href={`/catalog/${productData.categories[0]}/${item.productId}`}
						>
							{productData.description}
						</Link>

						<div className={styles.infoRow}>
							<PriceDisplay
								finalPrice={finalPrice}
								priceWithDiscount={priceWithDiscount}
								totalFinalPrice={totalFinalPrice}
								totalPriceWithoutCard={totalPriceWithoutCard}
								hasDiscount={hasDiscount}
								hasLoyaltyCard={hasLoyaltyCard}
								isOutOfStock={isOutOfStock}
							/>

							{hasDiscount && (
								<DiscountBadge discountPercent={productData.discountPercent} />
							)}
						</div>
					</div>
				</div>

				{showTooltip && <Tooltip text="Количество ограничено" position="top" />}
				<div className={styles.controlsSection}>
					{!isOutOfStock && (
						<QuantitySelector
							quantity={quantity}
							isUpdating={isUpdating}
							isOutOfStock={isOutOfStock}
							onDecrement={() => handleQuantityChange(quantity - 1)}
							onIncrement={() => handleQuantityChange(quantity + 1)}
						/>
					)}

					<div
						className={`${isOutOfStock ? styles.totalPriceOutOfStock : styles.priceColumn}`}
					>
						{isOutOfStock ? (
							<span className={styles.outOfStockText}>Нет в наличии</span>
						) : (
							<>
								<p className={styles.totalPrice}>
									{formatPrice(totalFinalPrice)} ₽
								</p>
								{hasDiscount && (
									<div className={styles.priceRowMobile}>
										<p className={styles.discountedPrice}>
											{formatPrice(totalPriceWithoutCard)} ₽
										</p>
										<p className={styles.discountAmount}>
											{formatPrice(totalFinalPrice - totalPriceWithoutCard)} ₽
										</p>
									</div>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
});

export default CartItem;

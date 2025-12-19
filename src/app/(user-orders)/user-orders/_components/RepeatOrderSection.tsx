import { RepeatOrderSectionProps } from "@/types/userOrder";
import { PriceComparisonAlert } from "./PriceComparisonAlert";
import { PricePreservedAlert } from "./PricePreservedAlert";
import { DeliveryInfo } from "./DeliveryInfo";
import CartSummary from "@/components/cart/CartSummary";
import styles from "./RepeatOrderSection.module.css";

const RepeatOrderSection = ({
	isRepeatOrderCreated,
	selectedDelivery,
	canCreateRepeatOrder,
	order,
	priceComparison,
	showPriceWarning,
	onClosePriceWarning,
	deliveryData,
	onEditDelivery,
	productsData,
	cartItemsForSummary,
	customPricing,
	onOrderSuccess,
}: RepeatOrderSectionProps) => {
	if (!selectedDelivery || isRepeatOrderCreated || !canCreateRepeatOrder)
		return null;

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>Оформление повторного заказа</h3>

			{showPriceWarning && priceComparison?.hasChanges && (
				<PriceComparisonAlert
					priceComparison={priceComparison}
					onClose={onClosePriceWarning}
				/>
			)}

			{priceComparison && !priceComparison.hasChanges && (
				<PricePreservedAlert orderTotal={order.totalAmount} />
			)}

			{deliveryData && (
				<DeliveryInfo delivery={deliveryData} onEdit={onEditDelivery} />
			)}
			<CartSummary
				deliveryData={deliveryData}
				productsData={productsData}
				isRepeatOrder={true}
				customCartItems={cartItemsForSummary}
				customPricing={customPricing}
				onOrderSuccess={onOrderSuccess}
			/>
		</div>
	);
};

export default RepeatOrderSection;

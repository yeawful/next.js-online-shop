import { CartSidebarProps } from "@/types/cart";
import BonusesSection from "./BonusesSection";
import CartSummary from "./CartSummary";
import styles from "./CartSidebar.module.css";

const CartSidebar = ({
	bonusesCount,
	useBonuses,
	onUseBonusesChange,
	totalPrice,
	visibleCartItems,
	totalMaxPrice,
	totalDiscount,
	finalPrice,
	totalBonuses,
	isMinimumReached,
}: CartSidebarProps) => {
	return (
		<div className={styles.container}>
			<BonusesSection
				bonusesCount={bonusesCount}
				useBonuses={useBonuses}
				onUseBonusesChange={onUseBonusesChange}
				totalPrice={totalPrice}
			/>

			<CartSummary
				visibleCartItems={visibleCartItems}
				totalMaxPrice={totalMaxPrice}
				totalDiscount={totalDiscount}
				finalPrice={finalPrice}
				totalBonuses={totalBonuses}
				isMinimumReached={isMinimumReached}
			/>
		</div>
	);
};

export default CartSidebar;

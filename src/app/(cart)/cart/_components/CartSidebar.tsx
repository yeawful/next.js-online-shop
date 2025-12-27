import { CartSidebarProps } from "@/types/cart";
import BonusesSection from "./BonusesSection";
import CartSummary from "@/app/(cart)/cart/_components/CartSummary";
import styles from "./CartSidebar.module.css";

const CartSidebar = ({ deliveryData, productsData }: CartSidebarProps) => {
	return (
		<div className={styles.container}>
			<BonusesSection />
			<CartSummary deliveryData={deliveryData} productsData={productsData} />
		</div>
	);
};

export default CartSidebar;

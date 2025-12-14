import { memo } from "react";
import styles from "./DiscountBadge.module.css";

interface DiscountBadgeProps {
	discountPercent: number;
}

const DiscountBadge = memo(function DiscountBadge({
	discountPercent,
}: DiscountBadgeProps) {
	return <div className={styles.badge}>-{discountPercent}%</div>;
});

export default DiscountBadge;

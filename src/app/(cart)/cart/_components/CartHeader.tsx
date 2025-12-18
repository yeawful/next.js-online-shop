import styles from "./CartHeader.module.css";

interface CartHeaderProps {
	itemCount: number;
	title: string;
}

const CartHeader = ({ itemCount, title }: CartHeaderProps) => {
	const badgeClass =
		title === "Доставка"
			? `${styles.countBadge} ${styles.countBadgeDelivery}`
			: `${styles.countBadge} ${styles.countBadgeCart}`;

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{title}</h1>
			{itemCount > 0 && (
				<div className={badgeClass}>
					<span className={styles.countText}>{itemCount}</span>
				</div>
			)}
		</div>
	);
};

export default CartHeader;

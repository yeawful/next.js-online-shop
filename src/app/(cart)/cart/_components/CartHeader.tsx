import styles from "./CartHeader.module.css";

interface CartHeaderProps {
	itemCount: number;
}

const CartHeader = ({ itemCount }: CartHeaderProps) => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Корзина</h1>
			{itemCount > 0 && (
				<div className={styles.countBadge}>
					<span className={styles.countText}>{itemCount}</span>
				</div>
			)}
		</div>
	);
};

export default CartHeader;

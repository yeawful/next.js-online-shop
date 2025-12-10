import Image from "next/image";
import styles from "./CartButton.module.css";

const CartButton = () => {
	return (
		<button className={styles.button}>
			<Image
				src="/icons-products/icon-shopping-cart.svg"
				alt="Корзина"
				width={32}
				height={32}
				className={styles.icon}
			/>
			<p className={styles.text}>В корзину</p>
		</button>
	);
};

export default CartButton;

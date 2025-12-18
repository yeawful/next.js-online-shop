"use client";

import { addToCartAction } from "@/actions/addToCartActions";
import Tooltip from "@/components/tooltip/Tooltip";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import { useState } from "react";
import styles from "./CartButton.module.css";

const CartButton = ({ productId }: { productId: string }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [showTooltip, setShowTooltip] = useState(false);
	const [tooltipMessage, setTooltipMessage] = useState("");

	const { fetchCart } = useCartStore();

	const showMessage = (message: string) => {
		setTooltipMessage(message);
		setShowTooltip(true);
		setTimeout(() => {
			setShowTooltip(false);
		}, 3000);
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		setShowTooltip(false);

		try {
			const result = await addToCartAction(productId);
			if (result.success) {
				await fetchCart();
			} else if (result.message) {
				showMessage(result.message);
			}
		} catch {
			showMessage("Ошибка при добавлении в корзину");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.container}>
			{showTooltip && <Tooltip text={tooltipMessage} position="top" />}
			<form action={handleSubmit}>
				<button disabled={isLoading} className={styles.formButton}>
					<Image
						src="/icons-products/icon-shopping-cart.svg"
						alt="Корзина"
						width={32}
						height={32}
						className={styles.cartIcon}
					/>
					<p className={styles.buttonText}>В корзину</p>
				</button>
			</form>
		</div>
	);
};

export default CartButton;

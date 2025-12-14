"use client";

import { addToCartAction } from "@/actions/addToCartActions";
import CartActionMessage from "@/components/products/CartActionMessage/CartActionMessage";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image";
import { useState } from "react";
import styles from "./CartButton.module.css";

const CartButton = ({ productId }: { productId: string }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState<{
		success: boolean;
		message: string;
	} | null>(null);

	const { fetchCart } = useCartStore();

	const handleSubmit = async () => {
		setIsLoading(true);
		setMessage(null);

		try {
			const result = await addToCartAction(productId);
			setMessage(result);
			if (result.success) {
				await fetchCart();
			}
		} catch {
			setMessage({
				success: false,
				message: "Ошибка при добавлении в корзину",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className={styles.container}>
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
			{message && (
				<CartActionMessage message={message} onClose={() => setMessage(null)} />
			)}
		</div>
	);
};

export default CartButton;

"use client";

import { addToCartAction } from "@/actions/addToCartActions";
import { useState } from "react";
import CartActionMessage from "../CartActionMessage/CartActionMessage";
import { useCartStore } from "@/store/cartStore";
import styles from "./AddToCartButton.module.css";

const AddToCartButton = ({ productId }: { productId: string }) => {
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
				<button
					type="submit"
					disabled={isLoading}
					className={styles.formButton}
				>
					В корзину
				</button>
			</form>
			{message && (
				<CartActionMessage message={message} onClose={() => setMessage(null)} />
			)}
		</div>
	);
};

export default AddToCartButton;

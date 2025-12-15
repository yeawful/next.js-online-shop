"use client";

import { addToCartAction } from "@/actions/addToCartActions";
import { useState } from "react";
import CartActionMessage from "../CartActionMessage/CartActionMessage";
import { useCartStore } from "@/store/cartStore";
import {
	removeMultipleOrderItemsAction,
	updateOrderItemQuantityAction,
} from "@/actions/orderActions";
import QuantitySelector from "@/app/(cart)/cart/_components/QuantitySelector";
import styles from "./AddToCartButton.module.css";

const AddToCartButton = ({ productId }: { productId: string }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState<{
		success: boolean;
		message: string;
	} | null>(null);

	const { cartItems, updateCart, fetchCart } = useCartStore();

	const cartItem = cartItems.find((item) => item.productId === productId);
	const currentQuantity = cartItem?.quantity || 0;
	const isInCart = currentQuantity > 0;

	const handleAddToCart = async () => {
		setIsLoading(true);
		setMessage(null);

		try {
			const result = await addToCartAction(productId);

			if (!result.success && result.message) {
				setMessage(result);
			}

			if (result.success) {
				await fetchCart();
			}
		} catch (error) {
			console.error("Ошибка добавления товара в корзину:", error);
			setMessage({
				success: false,
				message: "Ошибка при добавлении в корзину",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleQuantityUpdate = async (newQuantity: number) => {
		if (newQuantity < 0 || isLoading) return;

		setIsLoading(true);

		try {
			let updatedCartItems;
			if (newQuantity === 0) {
				updatedCartItems = cartItems.filter(
					(item) => item.productId !== productId
				);
				updateCart(updatedCartItems);
				await removeMultipleOrderItemsAction([productId]);
			} else {
				updatedCartItems = cartItems.map((item) =>
					item.productId === productId
						? { ...item, quantity: newQuantity }
						: item
				);
				updateCart(updatedCartItems);
				await updateOrderItemQuantityAction(productId, newQuantity);
			}

			await fetchCart();
		} catch (error) {
			console.error("Ошибка обновления количества:", error);
			await fetchCart();
		} finally {
			setIsLoading(false);
		}
	};

	const handleDecrement = () => {
		const newQuantity = Math.max(0, currentQuantity - 1);
		handleQuantityUpdate(newQuantity);
	};

	const handleIncrement = () => {
		handleQuantityUpdate(currentQuantity + 1);
	};

	return (
		<div className={styles.container}>
			{isInCart ? (
				<div className={styles.quantityContainer}>
					<QuantitySelector
						quantity={currentQuantity}
						isUpdating={isLoading}
						isOutOfStock={false}
						onDecrement={handleDecrement}
						onIncrement={handleIncrement}
						onProductCard={true}
					/>
				</div>
			) : (
				<button
					onClick={handleAddToCart}
					disabled={isLoading}
					className={styles.button}
				>
					{isLoading ? "..." : "В корзину"}
				</button>
			)}

			{message && (
				<CartActionMessage message={message} onClose={() => setMessage(null)} />
			)}
		</div>
	);
};

export default AddToCartButton;

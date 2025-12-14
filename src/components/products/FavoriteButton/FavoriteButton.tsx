"use client";

import { useAuthStore } from "@/store/authStore";
import IconHeart from "@/components/svg/IconHeart";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFavorites } from "@/hooks/useFavorites";
import styles from "./FavoriteButton.module.css";

interface FavoriteButtonProps {
	productId: string;
	variant?: "default" | "orange" | "onProductPage";
}

const FavoriteButton = ({
	productId,
	variant = "default",
}: FavoriteButtonProps) => {
	const { isAuth } = useAuthStore();
	const [isProcessing, setIsProcessing] = useState(false);
	const { toggleFavorite, isFavorite, isLoading } = useFavorites();
	const router = useRouter();

	const handleClick = async () => {
		if (!isAuth) {
			router.push("/login");
			return;
		}

		setIsProcessing(true);

		try {
			await toggleFavorite(productId);
		} catch (error) {
			console.error("Не удалось переключить избранное:", error);
		} finally {
			setIsProcessing(false);
		}
	};

	const isActive = isAuth && isFavorite(productId);
	const disabled = isLoading || isProcessing;

	const getButtonClass = () => {
		switch (variant) {
			case "onProductPage":
				return `${styles.button} ${styles.buttonOnProductPage}`;
			case "orange":
				return `${styles.button} ${styles.buttonOrange}`;
			case "default":
			default:
				return `${styles.button} ${styles.buttonDefault}`;
		}
	};

	return (
		<button
			onClick={handleClick}
			disabled={disabled}
			className={getButtonClass()}
			title={isActive ? "Удалить из избранного" : "Добавить в избранное"}
		>
			<IconHeart
				isActive={isActive}
				variant={variant === "orange" ? "orange" : "default"}
			/>
			{variant === "onProductPage" && (
				<p className={styles.buttonText}>В избранное</p>
			)}
		</button>
	);
};

export default FavoriteButton;

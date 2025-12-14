"use client";

import { useAuthStore } from "@/store/authStore";
import IconHeart from "@/components/svg/IconHeart";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFavorites } from "@/hooks/useFavorite";
import styles from "./FavoriteButton.module.css";

const FavoriteButton = ({ productId }: { productId: string }) => {
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

	const buttonClass = `${styles.button} ${disabled ? styles.disabled : ""}`;

	return (
		<button
			onClick={handleClick}
			disabled={disabled}
			className={buttonClass}
			title={isActive ? "Удалить из избранного" : "Добавить в избранное"}
		>
			<IconHeart isActive={isActive} />
		</button>
	);
};

export default FavoriteButton;

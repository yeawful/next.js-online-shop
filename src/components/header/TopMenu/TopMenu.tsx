"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import IconMenuMob from "@/components/svg/IconMenuMob";
import IconBox from "@/components/svg/IconBox";
import IconHeart from "@/components/svg/IconHeart";
import IconCart from "@/components/svg/IconCart";
import { useEffect } from "react";
import styles from "./TopMenu.module.css";

const TopMenu = () => {
	const pathname = usePathname();
	const isCatalogPage = pathname === "/catalog";
	const isFavoritesPage = pathname === "/favorites";
	const isCartPage = pathname === "/cart";

	const { user } = useAuthStore();
	const { totalItems, fetchCart } = useCartStore();

	const isManagerOrAdmin = user?.role === "manager" || user?.role === "admin";

	useEffect(() => {
		if (user && !isManagerOrAdmin) {
			fetchCart();
		}
	}, [user, isManagerOrAdmin, fetchCart]);

	const getTextClass = (isActive: boolean) => {
		return isActive ? styles.menuTextActive : styles.menuText;
	};

	return (
		<ul className={styles.container}>
			<li>
				<Link
					href="/catalog"
					className={`${styles.menuItem} ${styles.mobileOnly}`}
				>
					<IconMenuMob isCatalogPage={isCatalogPage} />
					<span className={getTextClass(isCatalogPage)}>Каталог</span>
				</Link>
			</li>

			{!isManagerOrAdmin && (
				<li>
					<Link href="/favorites" className={styles.menuItem}>
						<IconHeart isActive={isFavoritesPage} variant="orange" />
						<span className={getTextClass(isFavoritesPage)}>Избранное</span>
					</Link>
				</li>
			)}

			<li className={styles.menuItem}>
				<IconBox />
				<span className={getTextClass(isManagerOrAdmin)}>Заказы</span>
			</li>

			{!isManagerOrAdmin && (
				<li className={styles.cartItem}>
					<Link href="/cart" className={styles.menuItem}>
						<IconCart isActive={isCartPage} />

						{totalItems > 0 && (
							<span className={styles.badge}>
								{totalItems > 99 ? "99+" : totalItems}
							</span>
						)}

						<span className={getTextClass(isCartPage)}>Корзина</span>
					</Link>
				</li>
			)}
		</ul>
	);
};

export default TopMenu;

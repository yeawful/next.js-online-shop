"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import IconMenuMob from "@/components/ui/svg/IconMenuMob";
import IconBox from "@/components/ui/svg/IconBox";
import IconHeart from "@/components/ui/svg/IconHeart";
import IconCart from "@/components/ui/svg/IconCart";
import { useEffect } from "react";
import styles from "./TopMenu.module.css";

const TopMenu = () => {
	const pathname = usePathname();
	const isCatalogPage = pathname === "/catalog";
	const isFavoritesPage = pathname === "/favorites";
	const isCartPage = pathname === "/cart";
	const isUserOrdersPage = pathname === "/user-orders";
	const isAdminOrdersPage = pathname === "/administrator/admin-orders";

	const { isAuth, user } = useAuthStore();
	const { totalItems, fetchCart } = useCartStore();

	const isManagerOrAdmin = user?.role === "manager" || user?.role === "admin";
	const ordersLink = !isAuth
		? "/login"
		: isManagerOrAdmin
			? "/administrator/admin-orders"
			: "/user-orders";
	const isOrdersPage = isUserOrdersPage || isAdminOrdersPage;

	useEffect(() => {
		if (user && !isManagerOrAdmin) {
			fetchCart();
		}
	}, [user, isManagerOrAdmin, fetchCart]);

	const getTextClass = (isActive: boolean) => {
		return isActive ? styles.menuTextActive : styles.menuText;
	};

	const getLink = (path: string) => {
		return isAuth ? path : "/login";
	};

	return (
		<ul className={styles.container}>
			<li>
				<Link
					href={"/catalog"}
					className={`${styles.menuItem} ${styles.mobileOnly}`}
				>
					<IconMenuMob isCatalogPage={isCatalogPage} />
					<span className={getTextClass(isCatalogPage)}>Каталог</span>
				</Link>
			</li>

			{!isManagerOrAdmin && (
				<li>
					<Link href={getLink("/favorites")} className={styles.menuItem}>
						<IconHeart isActive={isFavoritesPage} variant="orange" />
						<span className={getTextClass(isFavoritesPage)}>Избранное</span>
					</Link>
				</li>
			)}

			<li>
				<Link href={ordersLink} className={styles.menuItem}>
					<IconBox isActive={isOrdersPage} />
					<span className={getTextClass(isOrdersPage)}>Заказы</span>
				</Link>
			</li>

			{!isManagerOrAdmin && (
				<li className={styles.cartItem}>
					<Link href={getLink("/cart")} className={styles.menuItem}>
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

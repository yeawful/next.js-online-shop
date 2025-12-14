"use client";

import Image from "next/image";
import iconCart from "/public/icons-header/icon-cart.svg";
import IconMenuMob from "@/components/svg/IconMenuMob";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import IconBox from "@/components/svg/IconBox";
import IconHeart from "@/components/svg/IconHeart";
import styles from "./TopMenu.module.css";

const TopMenu = () => {
	const pathname = usePathname();
	const isCatalogPage = pathname === "/catalog";
	const isFavoritePage = pathname === "/favorites";
	const { user } = useAuthStore();

	const isManagerOrAdmin = user?.role === "manager" || user?.role === "admin";

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
						<IconHeart isActive={isFavoritePage} variant="orange" />
						<span className={getTextClass(isFavoritePage)}>Избранное</span>
					</Link>
				</li>
			)}

			<li className={styles.menuItemUpgrade}>
				<IconBox />
				<span className={getTextClass(isManagerOrAdmin)}>Заказы</span>
			</li>
			{!isManagerOrAdmin && (
				<li className={styles.menuItem}>
					<Image
						src={iconCart}
						alt="Корзина"
						width={24}
						height={24}
						className={styles.icon}
					/>
					<span className={styles.menuText}>Корзина</span>
				</li>
			)}
		</ul>
	);
};

export default TopMenu;

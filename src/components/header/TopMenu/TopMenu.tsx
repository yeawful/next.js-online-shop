"use client";

import Image from "next/image";
import iconHeart from "/public/icons-header/icon-heart.svg";
import iconCart from "/public/icons-header/icon-cart.svg";
import IconMenuMob from "@/components/svg/IconMenuMob";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import IconBox from "@/components/svg/IconBox";
import styles from "./TopMenu.module.css";

const TopMenu = () => {
	const pathname = usePathname();
	const isCatalogPage = pathname === "/catalog";
	const { user } = useAuthStore();

	const isManagerOrAdmin = user?.role === "manager" || user?.role === "admin";

	return (
		<ul className={styles.topMenu}>
			<Link href="/catalog" className={styles.menuLink}>
				<li className={styles.menuItem}>
					<IconMenuMob isCatalogPage={isCatalogPage} />
					<span
						className={isCatalogPage ? styles.menuTextActive : styles.menuText}
					>
						Каталог
					</span>
				</li>
			</Link>

			{!isManagerOrAdmin && (
				<li className={styles.menuItem}>
					<Image
						src={iconHeart}
						alt="Избранное"
						width={24}
						height={24}
						className={styles.menuIcon}
					/>
					<span>Избранное</span>
				</li>
			)}

			<li className={styles.menuItemUpgrade}>
				<IconBox />
				<span className={isManagerOrAdmin ? styles.menuTextActive : ""}>
					Заказы
				</span>
			</li>
			{!isManagerOrAdmin && (
				<li className={styles.menuItem}>
					<Image
						src={iconCart}
						alt="Корзина"
						width={24}
						height={24}
						className={styles.menuIcon}
					/>
					<span>Корзина</span>
				</li>
			)}
		</ul>
	);
};

export default TopMenu;

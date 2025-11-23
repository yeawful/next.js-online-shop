"use client";

import Image from "next/image";
import iconHeart from "/public/icons-header/icon-heart.svg";
import iconBox from "/public/icons-header/icon-box.svg";
import iconCart from "/public/icons-header/icon-cart.svg";
import IconMenuMob from "@/components/svg/IconMenuMob";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./TopMenu.module.css";

const TopMenu = () => {
	const pathname = usePathname();
	const isCatalogPage = pathname === "/catalog";

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

			<li className={styles.menuItem}>
				<Image
					src={iconHeart}
					alt="Избранное"
					width={24}
					height={24}
					className={styles.menuIcon}
				/>
				<span className={styles.menuText}>Избранное</span>
			</li>
			<li className={styles.menuItem}>
				<Image
					src={iconBox}
					alt="Заказы"
					width={24}
					height={24}
					className={styles.menuIcon}
				/>
				<span className={styles.menuText}>Заказы</span>
			</li>
			<li className={styles.menuItem}>
				<Image
					src={iconCart}
					alt="Корзина"
					width={24}
					height={24}
					className={styles.menuIcon}
				/>
				<span className={styles.menuText}>Корзина</span>
			</li>
		</ul>
	);
};

export default TopMenu;

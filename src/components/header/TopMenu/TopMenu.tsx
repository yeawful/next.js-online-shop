import Image from "next/image";
import iconHeart from "/public/icons-header/icon-heart.svg";
import iconBox from "/public/icons-header/icon-box.svg";
import iconCart from "/public/icons-header/icon-cart.svg";
import iconMenuMob from "/public/icons-header/icon-menu-mob.svg";
import styles from "./TopMenu.module.css";
import Link from "next/link";

const TopMenu = () => {
	return (
		<ul className={styles.menu}>
			<Link href="/catalog">
				<li className={styles.mobileMenuItem}>
					<Image
						src={iconMenuMob}
						alt="Меню"
						width={24}
						height={24}
						className={styles.menuIcon}
					/>
					<span className={styles.menuText}>Каталог</span>
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

"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footerContent}>
				<div className={styles.logo}>
					<Link href="/" className={styles.logoLink}>
						<Image
							src="/icons-footer/logo-footer.png"
							alt="Логотип"
							fill
							sizes="(max-width: 768px) 100vw, 50vw"
						/>
					</Link>
				</div>

				<div className={styles.social}>
					<div className={styles.socialLinks}>
						<a href="https://vk.com" target="_blank" rel="noopener noreferrer">
							<Image
								src="/icons-footer/VK.svg"
								alt="VKontakte"
								width={24}
								height={24}
								className={styles.socialIcon}
							/>
						</a>
						<a href="https://ok.ru" target="_blank" rel="noopener noreferrer">
							<Image
								src="/icons-footer/OK.svg"
								alt="Odnoklassniki"
								width={24}
								height={24}
								className={styles.socialIcon}
							/>
						</a>
					</div>
					<div className={styles.socialLinks}>
						<a
							href="https://wa.me/78007773333"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								src="/icons-footer/wa.svg"
								alt="WhatsApp"
								width={24}
								height={24}
								className={styles.socialIcon}
							/>
						</a>
						<a
							href="https://t.me/alexeirybak"
							target="_blank"
							rel="noopener noreferrer"
						>
							<Image
								src="/icons-footer/telegram.svg"
								alt="Telegram"
								width={24}
								height={24}
								className={styles.socialIcon}
							/>
						</a>
					</div>
				</div>

				<div className={styles.phone}>
					<a href="tel:+78007773333" className={styles.phoneLink}>
						<Image
							src="/icons-footer/phone.svg"
							alt="Позвонить по телефону"
							width={20}
							height={20}
							className={styles.socialIcon}
						/>
						<p className={styles.phoneText}>8 800 777 33 33</p>
					</a>
				</div>

				<nav className={styles.nav}>
					<ul className={styles.navList}>
						<li className={styles.navItem}>
							<Link href="#">О компании</Link>
						</li>
						<li className={styles.navItem}>
							<Link href="#">Контакты</Link>
						</li>
						<li className={styles.navItem}>
							<Link href="#">Вакансии</Link>
						</li>
						<li className={styles.navItem}>
							<Link href="/blog">Статьи</Link>
						</li>
						<li className={styles.navItem}>
							<Link href="#"> Политика обработки персональных данных</Link>
						</li>
					</ul>
				</nav>

				<div className={styles.design}>
					<a
						href="https://zasovskiy.ru/"
						target="_blank"
						className={styles.designLink}
					>
						<Image
							src="/icons-footer/design.png"
							alt="Дизайнер"
							width={152}
							height={18}
						/>
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;

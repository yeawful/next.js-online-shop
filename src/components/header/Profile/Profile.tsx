"use client";

import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import avatar from "/public/images/graphics/avatar.png";
import iconArrow from "/public/icons-header/icon-arrow.svg";
import Link from "next/link";
import styles from "./Profile.module.css";

const Profile = () => {
	const { isAuth, userName } = useAuthStore();

	if (!isAuth) {
		return (
			<Link href="/login" className={styles.loginButton}>
				<div className={styles.loginText}>
					<p>Войти</p>
				</div>
				<Image
					src="/icons-header/icon-entry.svg"
					alt="Войти"
					width={24}
					height={24}
				/>
			</Link>
		);
	}

	return (
		<div className={styles.profile}>
			<Image
				src={avatar}
				alt="Ваш профиль"
				width={40}
				height={40}
				className={styles.avatar}
			/>
			<p className={styles.userName}>{userName}</p>
			<button className={styles.arrowButton}>
				<Image
					src={iconArrow}
					alt="Меню профиля"
					width={24}
					height={24}
					sizes="24px"
				/>
			</button>
		</div>
	);
};

export default Profile;

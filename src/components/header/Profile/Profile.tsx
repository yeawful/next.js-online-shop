"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import iconArrow from "/public/icons-header/icon-arrow.svg";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { getAvatarByGender } from "../../../utils/getAvatarByGender";
import styles from "./Profile.module.css";

const Profile = () => {
	const { isAuth, user, logout, checkAuth, isLoading } = useAuthStore();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth <= 768);
		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsMenuOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	const handleLogout = async () => {
		setIsLoggingOut(true);
		try {
			await logout();
			router.replace("/");
		} catch (error) {
			console.error("Не удалось выйти:", error);
		} finally {
			setIsLoggingOut(false);
			setIsMenuOpen(false);
		}
	};

	if (isLoading) {
		return <div className={styles.loadingAvatar}></div>;
	}

	if (!isAuth) {
		return (
			<Link href="/login" className={styles.linkContainer}>
				<div className={styles.linkText}>
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
		<div className={styles.profileContainer} ref={menuRef}>
			<div className={styles.userInfo} onClick={toggleMenu}>
				<Image
					src={getAvatarByGender(user?.gender)}
					alt="Ваш профиль"
					width={40}
					height={40}
					className={styles.avatar}
				/>
				<p className={styles.userName}>
					{isLoading ? "Загрузка..." : user?.name}
				</p>
				<div className={styles.arrowIcon}>
					<Image
						src={iconArrow}
						alt="Меню профиля"
						width={24}
						height={24}
						sizes="24px"
						className={isMenuOpen ? styles.arrowRotated : ""}
					/>
				</div>
			</div>

			{/* Выпадающее меню */}
			<div
				className={`${styles.dropdownMenu} ${isMenuOpen ? styles.dropdownOpen : ""} ${isMobile ? styles.dropdownMobile : styles.dropdownDesktop}`}
			>
				<Link
					href="/user-profile"
					className={styles.menuItem}
					onClick={() => setIsMenuOpen(false)}
				>
					Профиль
				</Link>
				<Link
					href="/"
					className={styles.menuItem}
					onClick={() => setIsMenuOpen(false)}
				>
					Главная
				</Link>
				<button
					onClick={handleLogout}
					disabled={isLoggingOut}
					className={styles.logoutButton}
				>
					{isLoggingOut ? "Выход..." : "Выйти"}
				</button>
			</div>
		</div>
	);
};

export default Profile;

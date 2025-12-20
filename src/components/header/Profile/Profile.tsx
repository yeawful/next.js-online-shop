"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { getAvatarByGender } from "../../../utils/getAvatarByGender";
import { checkAvatarExists } from "../../../utils/avatarUtils";
import MiniLoader from "@/components/loaders/MiniLoader";
import styles from "./Profile.module.css";

const Profile = () => {
	const { isAuth, user, logout, checkAuth, isLoading } = useAuthStore();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [avatarSrc, setAvatarSrc] = useState<string>("");
	const [lastUpdate, setLastUpdate] = useState(Date.now());
	const menuRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	const getDisplayName = () => {
		if (!user?.name) return <MiniLoader />;

		if (user.role === "manager") {
			return `Менеджер ${user.name}`;
		} else if (user.role === "admin") {
			return `Администратор ${user.name}`;
		}

		return user.name;
	};

	const isManagerOrAdmin = () => {
		return user?.role === "manager" || user?.role === "admin";
	};

	useEffect(() => {
		setLastUpdate(Date.now());
	}, [user]);

	useEffect(() => {
		const checkAvatar = async () => {
			if (user?.id) {
				try {
					const exists = await checkAvatarExists(user.id);

					if (exists) {
						setAvatarSrc(`/api/auth/avatar/${user.id}?t=${lastUpdate}`);
					} else {
						setAvatarSrc(getAvatarByGender(user.gender));
					}
				} catch {
					setAvatarSrc(getAvatarByGender(user.gender));
				}
			} else if (user?.gender) {
				setAvatarSrc(getAvatarByGender(user.gender));
			}
		};

		checkAvatar();
	}, [user, lastUpdate]);

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

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

	const handleAvatarError = () => {
		if (user?.gender) {
			setAvatarSrc(getAvatarByGender(user.gender));
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
					src={avatarSrc || getAvatarByGender(user?.gender)}
					alt="Ваш профиль"
					width={40}
					height={40}
					onError={handleAvatarError}
					className={styles.avatar}
					unoptimized={true}
				/>
				<p className={styles.userName}>{getDisplayName()}</p>
				<div className={styles.arrowIcon}>
					<Image
						src="/icons-header/icon-arrow.svg"
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
				{isManagerOrAdmin() && (
					<Link
						href="/administrator"
						className={styles.menuItem}
						onClick={() => setIsMenuOpen(false)}
					>
						Панель управления
					</Link>
				)}
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

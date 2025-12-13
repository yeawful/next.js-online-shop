"use client";

import { ErrorContent } from "@/app/(auth)/(reg)/_components/ErrorContent";
import { useAuthStore } from "@/store/authStore";
import { MailWarning, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import ProfileHeader from "../_components/ProfileHeader";
import { useEffect, useState } from "react";
import { Loader } from "@/components/loaders/Loader";
import SecuritySection from "../_components/SecuritySection";
import ProfileAvatar from "../_components/ProfileAvatar";
import LocationSection from "../_components/LocationSection";
import ProfileEmail from "../_components/ProfileEmail";
import ProfilePhoneSettings from "../_components/ProfilePhone/ProfilePhoneSettings";
import ProfilePassword from "../_components/ProfilePassword";
import ProfileCard from "../_components/ProfileCard";
import styles from "./page.module.css";

const ProfilePage = () => {
	const { user, isAuth, checkAuth } = useAuthStore();
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);
	const router = useRouter();
	const isPhoneRegistration = user?.phoneNumberVerified;

	useEffect(() => {
		const checkAuthentication = async () => {
			await checkAuth();
			setIsCheckingAuth(false);
		};
		checkAuthentication();
	}, [checkAuth]);

	useEffect(() => {
		if (!isCheckingAuth && !isAuth) {
			router.replace("/");
		}
	}, [isAuth, isCheckingAuth, router]);

	const handleToLogin = () => {
		router.replace("/login");
	};

	const handleToRegister = () => {
		router.replace("/register");
	};

	if (isCheckingAuth) {
		return <Loader />;
	}

	if (!isAuth) {
		return <Loader />;
	}

	if (!user) {
		return (
			<ErrorContent
				error="Данные пользователя не найдены"
				icon={<MailWarning className="h-8 w-8 text-red-600" />}
				primaryAction={{ label: "Войти", onClick: handleToLogin }}
				secondaryAction={{
					label: "Зарегистрироваться",
					onClick: handleToRegister,
				}}
			/>
		);
	}

	return (
		<div className={styles.pageContainer}>
			<div className={styles.content}>
				<ProfileHeader name={user.name} surname={user.surname} />

				<div className={styles.innerContent}>
					<div className={styles.registrationBadge}>
						<div className={styles.badge}>
							{isPhoneRegistration ? (
								<>
									<Phone className={styles.badgeIcon} />
									<span>Зарегистрирован по телефону</span>
								</>
							) : (
								<>
									<MailWarning className={styles.badgeIcon} />
									<span>Зарегистрирован по email</span>
								</>
							)}
						</div>
					</div>
					<ProfileAvatar gender={user.gender || "male"} />
					<LocationSection />
					<div className={styles.grid}>
						<ProfileEmail />
						<ProfilePhoneSettings />
					</div>
					<div className={styles.grid}>
						<ProfilePassword />
						<ProfileCard />
					</div>
					<SecuritySection />
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;

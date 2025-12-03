"use client";

import { ErrorContent } from "@/app/(auth)/(reg)/_components/ErrorContent";
import { useAuthStore } from "@/store/authStore";
import { MailWarning, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import ProfileHeader from "../_components/ProfileHeader";
import { useEffect, useState } from "react";
import { Loader } from "@/components/loaders/Loader";
import SecuritySection from "../_components/SecuritySection";
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
			<div className={styles.contentContainer}>
				<div className={styles.animatedWrapper}>
					<div className={styles.profileCard}>
						<ProfileHeader name={user.name} surname={user.surname} />

						<div className={styles.cardContent}>
							<div className={styles.badgeContainer}>
								<div className={styles.badge}>
									{!isPhoneRegistration ? (
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
							<SecuritySection />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;

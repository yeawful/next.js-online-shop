"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";
import { AuthFormLayout } from "../../../_components/AuthFormLayout";
import styles from "./page.module.css";

export default function VerifySuccessPage() {
	const router = useRouter();
	const [secondsLeft, setSecondsLeft] = useState(5);

	useEffect(() => {
		const timer = setTimeout(() => {
			router.push("/login");
		}, 5000);

		const interval = setInterval(() => {
			setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
		}, 1000);

		return () => {
			clearTimeout(timer);
			clearInterval(interval);
		};
	}, [router]);

	const getSecondsText = (seconds: number) => {
		if (seconds % 10 === 1 && seconds % 100 !== 11) return "секунду";
		if (
			seconds % 10 >= 2 &&
			seconds % 10 <= 4 &&
			(seconds % 100 < 10 || seconds % 100 >= 20)
		)
			return "секунды";
		return "секунд";
	};

	return (
		<AuthFormLayout>
			<div className={styles.successContainer}>
				<div className={styles.successIcon}>
					<CheckCircle className={styles.icon} />
				</div>

				<h1 className={styles.title}>Email успешно подтвержден!</h1>

				<p className={styles.message}>
					Ваш адрес электронной почты был успешно подтвержден. Теперь Вы можете
					войти в свой аккаунт.
				</p>

				<div className={styles.actions}>
					<button
						onClick={() => router.replace("/login")}
						className={styles.loginButton}
					>
						Перейти к авторизации
					</button>

					<p className={styles.timer}>
						Автоматический переход через {secondsLeft}{" "}
						{getSecondsText(secondsLeft)}...
					</p>
				</div>
			</div>

			<div className={styles.footer}>
				<p className={styles.footerText}>
					Нужна помощь?{" "}
					<Link href="/contacts" className={styles.supportLink}>
						Свяжитесь с поддержкой
					</Link>
				</p>
			</div>
		</AuthFormLayout>
	);
}

"use client";

import Image from "next/image";
import { useAuthStore } from "@/store/authStore";
import useTimer from "@/hooks/useTimer";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthFormLayout } from "@/app/(auth)/_components/AuthFormLayout";
import { LoadingContent } from "@/app/(auth)/(reg)/_components/LoadingContent";
import OTPResendCode from "@/app/(auth)/_components/OTPResendButton";
import styles from "./LoginWithOTP.module.css";

const MAX_ATTEMPTS = 3;
const TIMEOUT_PERIOD = 180;

const LoginWithOTP = ({ phoneNumber }: { phoneNumber: string }) => {
	const [code, setCode] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
	const { timeLeft, canResend, startTimer } = useTimer(TIMEOUT_PERIOD);
	const router = useRouter();
	const { login } = useAuthStore();

	useEffect(() => {
		startTimer();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (code.length !== 4) return;

		setIsLoading(true);

		try {
			const { error: verifyError } = await authClient.phoneNumber.verify({
				phoneNumber,
				code,
				disableSession: false,
			});

			if (verifyError) throw verifyError;

			setAttemptsLeft(MAX_ATTEMPTS);

			const response = await fetch("/api/auth/check-phone", {
				method: "POST",
				body: JSON.stringify({
					phoneNumber,
				}),
			});

			if (!response.ok) {
				throw new Error("Данные не получены");
			}

			const userData = await response.json();

			login(userData.userName);

			router.replace("/");
		} catch (error) {
			console.error("Ошибка верификации телефона:", error);
			setCode("");
			setAttemptsLeft((prev) => prev - 1);

			if (attemptsLeft <= 1) {
				setError("Попытки исчерпаны. Пожалуйста, зарегистрируйтесь снова");
				setTimeout(() => router.replace("/register"), 2000);
			} else {
				setError(`Неверный код. Осталось попыток: ${attemptsLeft - 1}`);
			}
		} finally {
			setIsLoading(false);
		}
	};

	const handleResend = async () => {
		if (!canResend) return;
		try {
			await authClient.phoneNumber.sendOtp(
				{ phoneNumber },
				{
					onSuccess: () => {
						startTimer();
						setError("");
						setAttemptsLeft(MAX_ATTEMPTS);
					},
					onError: (ctx) => {
						setError(ctx.error?.message || "Ошибка при отправке SMS");
					},
				}
			);
		} catch (error) {
			console.error("Ошибка отправки кода:", error);
			setError("Ошибка при отправке кода");
		}
	};

	if (isLoading) {
		return (
			<AuthFormLayout>
				<LoadingContent title={"Проверяем код..."} />
			</AuthFormLayout>
		);
	}

	return (
		<AuthFormLayout>
			<div className={styles.container}>
				<h1 className={styles.title}>Вход</h1>
				<div>
					<p className={styles.subtitle}>Код из SMS</p>
					<form
						onSubmit={handleSubmit}
						className={styles.form}
						autoComplete="off"
					>
						<input
							type="password"
							inputMode="numeric"
							pattern="[0-9]{4}"
							maxLength={4}
							value={code}
							onChange={(e) => {
								setCode(e.target.value);
								setError("");
							}}
							className={styles.codeInput}
							autoComplete="one-time-code"
							required
						/>
						{error && <div className={styles.error}>{error}</div>}
						<button
							type="submit"
							className={`${styles.button} ${code.length !== 4 ? styles.buttonInactive : styles.buttonActive}`}
							disabled={code.length !== 4 || attemptsLeft <= 0}
						>
							Подтвердить
						</button>
					</form>
				</div>

				<OTPResendCode
					canResend={canResend}
					timeLeft={timeLeft}
					onResendAction={handleResend}
				/>
				<Link href="/register" className={styles.backLink}>
					<Image
						src="/icons-auth/icon-arrow-left.svg"
						width={24}
						height={24}
						alt="Вернуться"
					/>
					Вернуться
				</Link>
			</div>
		</AuthFormLayout>
	);
};

export default LoginWithOTP;

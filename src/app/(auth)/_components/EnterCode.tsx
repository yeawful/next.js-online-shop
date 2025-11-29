"use client";

import Link from "next/link";
import Image from "next/image";
import { useRegFormContext } from "@/app/contexts/RegFormContext";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import useTimer from "@/hooks/useTimer";
import styles from "./EnterCode.module.css";

const MAX_ATTEMPTS = 3;
const TIMEOUT_PERIOD = 180;

export const EnterCode = ({ phoneNumber }: { phoneNumber: string }) => {
	const [code, setCode] = useState("");
	const [error, setError] = useState("");
	const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
	const { regFormData } = useRegFormContext();
	const { timeLeft, canResend, startTimer } = useTimer(TIMEOUT_PERIOD);
	const router = useRouter();

	useEffect(() => {
		startTimer();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (code.length !== 4) return;

		try {
			const { data: verifyData, error: verifyError } =
				await authClient.phoneNumber.verify({
					phoneNumber,
					code,
					disableSession: false,
				});

			if (verifyError) throw verifyError;

			setAttemptsLeft(MAX_ATTEMPTS);

			const passwordResponse = await fetch("/api/auth/set-password", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					userId: verifyData.user.id,
					password: regFormData.password,
				}),
			});

			if (!passwordResponse.ok) {
				const errorData = await passwordResponse.json();
				console.error("Детали ошибки", errorData);
				throw new Error(errorData.error || "Ошибка установки пароля");
			}

			// const { error: updateError } = await authClient.updateUser(regFormData);

			// if (updateError) throw updateError;

			router.replace("/login");
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

	return (
		<>
			<div className={styles.container}>
				<h1 className={styles.title}>Регистрация</h1>
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
							className={`${styles.button} ${code.length !== 4 ? styles.buttonInactive : styles.buttonActive} ${styles.buttonMargin}`}
							disabled={code.length !== 4 || attemptsLeft <= 0}
						>
							Подтвердить
						</button>
					</form>
				</div>

				{!canResend ? (
					<p className={styles.timerText}>
						Запросить код повторно можно через{" "}
						<span className={styles.timerBold}>{timeLeft} секунд</span>
					</p>
				) : (
					<button
						onClick={handleResend}
						disabled={!canResend}
						className={styles.resendButton}
					>
						Отправить еще раз
					</button>
				)}
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
		</>
	);
};

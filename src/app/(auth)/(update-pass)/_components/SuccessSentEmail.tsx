import { AuthFormLayout } from "@/app/(auth)/_components/AuthFormLayout";
import { MailCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import styles from "./SuccessSentEmail.module.css";

const SuccessSentEmail = ({ email }: { email: string }) => {
	const router = useRouter();

	return (
		<AuthFormLayout>
			<div className={styles.container}>
				<div className={styles.header}>
					<MailCheck className={styles.icon} />
					<h1 className={styles.title}>Проверьте Вашу почту</h1>
				</div>

				<p className={styles.description}>
					Если Вы <strong>регистрировались по email</strong> и аккаунт с email{" "}
					<strong>{email}</strong> существует в нашей системе, мы отправили
					письмо с инструкциями по сбросу пароля.
				</p>

				<div className={styles.emailNotice}>
					<h3 className={styles.emailNoticeTitle}>Не получили письмо?</h3>
					<ul className={styles.emailNoticeList}>
						<li>Проверьте папку «Спам» или «Нежелательная почта»</li>
						<li>
							Убедитесь, что Вы регистрировались именно по email, а не по номеру
							телефона
						</li>
						<li>
							Попробуйте войти с помощью номера телефона, если Вы его указывали
						</li>
						<li>Письмо может приходить с задержкой до 5-10 минут</li>
					</ul>
				</div>

				<div className={styles.phoneNotice}>
					<h3 className={styles.phoneNoticeTitle}>
						Регистрировались по телефону?
					</h3>
					<p className={styles.phoneNoticeText}>
						Если Вы не помните, как регистрировались, попробуйте
						<button
							type="button"
							onClick={() => router.replace("/login")}
							className={styles.phoneButton}
						>
							войти с помощью номера телефона
						</button>
					</p>
				</div>
			</div>
		</AuthFormLayout>
	);
};

export default SuccessSentEmail;

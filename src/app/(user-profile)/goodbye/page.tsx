import Link from "next/link";
import { AuthFormLayout } from "@/app/(auth)/_components/AuthFormLayout";
import styles from "./page.module.css";

export default function GoodbyePage() {
	return (
		<AuthFormLayout>
			<div className={styles.container}>
				<h1 className={styles.title}>Ваш аккаунт был удален</h1>
				<p className={styles.message}>
					Спасибо, что были с нами. Все ваши данные были успешно удалены.
				</p>
				<Link href="/" className={styles.linkButton}>
					На главную
				</Link>
			</div>
		</AuthFormLayout>
	);
}

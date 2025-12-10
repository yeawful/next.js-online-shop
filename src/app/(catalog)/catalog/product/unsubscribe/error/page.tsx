import Link from "next/link";
import styles from "./page.module.css";

export default function UnsubscribeError() {
	return (
		<div className={styles.container}>
			<div className={styles.errorBox}>
				<h1 className={styles.title}>Ошибка отписки</h1>
				<p>
					Не удалось отписаться от уведомлений. Возможно, ссылка устарела или
					подписка уже отменена.
				</p>
			</div>
			<Link href="/" className={styles.link}>
				Вернуться на главную
			</Link>
		</div>
	);
}

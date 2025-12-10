import Link from "next/link";
import styles from "./page.module.css";

export default function UnsubscribeSuccess() {
	return (
		<div className={styles.container}>
			<div className={styles.successBox}>
				<h1 className={styles.title}>Отписка выполнена</h1>
				<p>
					Вы успешно отписались от уведомления о снижении цены на данный товар.
				</p>
			</div>
			<Link href="/" className={styles.link}>
				Вернуться на главную
			</Link>
		</div>
	);
}

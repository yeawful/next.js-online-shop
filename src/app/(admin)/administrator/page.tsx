import Link from "next/link";
import styles from "./page.module.css";

const AdminPanel = () => {
	return (
		<div className={styles.adminPanelContainer}>
			<h1 className={styles.title}>Панель управления</h1>

			<div className={styles.grid}>
				<Link href="/administrator/users-list" className={styles.adminLink}>
					Управление пользователями
				</Link>
			</div>
		</div>
	);
};

export default AdminPanel;

import styles from "./MenuFooter.module.css";

export const MenuFooter = () => {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.versionBadge}>
					<div className={styles.statusDot} />
					<span className={styles.versionText}>CMS Панель • v1.0</span>
				</div>
			</div>
		</div>
	);
};

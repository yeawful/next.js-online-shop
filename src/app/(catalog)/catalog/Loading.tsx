import styles from "./Loading.module.css";

export default function Loading() {
	return (
		<div className={styles.loading}>
			<div className={styles.loadingIcon}>
				{[...Array(3)].map((_, i) => (
					<div
						key={i}
						className={styles.spinnerRing}
						style={{
							animationDuration: `${1 + i * 0.5}s`,
							opacity: 1 - i * 0.3,
						}}
					/>
				))}
			</div>

			<div className={styles.loadingText}>
				<p className={styles.loadingTitle}>Загружаем каталог</p>
				<p className={styles.loadingSubtitle}>
					Это займет всего несколько секунд
				</p>
			</div>

			<div className={styles.progressBar}>
				<div className={styles.progressFill} />
			</div>
		</div>
	);
}

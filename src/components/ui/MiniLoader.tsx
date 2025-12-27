import styles from "./MiniLoader.module.css";

const MiniLoader = () => {
	return (
		<div className={styles.miniLoader}>
			<div className={styles.loaderDots}>
				<div className={`${styles.loaderDot} ${styles.dot1}`} />
				<div className={`${styles.loaderDot} ${styles.dot2}`} />
				<div className={`${styles.loaderDot} ${styles.dot3}`} />
			</div>
		</div>
	);
};

export default MiniLoader;

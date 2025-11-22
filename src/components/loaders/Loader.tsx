import styles from "./Loader.module.css";

interface LoaderProps {
	text?: string;
	className?: string;
}

export const Loader = ({ text = "", className = "" }: LoaderProps) => (
	<div className={`${styles.loader} ${className}`}>
		<div className={styles.loaderContainer}>
			<div className={styles.loaderRing1}></div>
			<div className={styles.loaderRing2}></div>
		</div>
		{text && <p className={styles.loaderText}>Загрузка {text}...</p>}
	</div>
);

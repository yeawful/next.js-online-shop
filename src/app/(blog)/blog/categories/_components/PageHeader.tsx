import styles from "./PageHeader.module.css";

export default function PageHeader() {
	return (
		<div className={styles.headerContainer}>
			<h1 className={styles.title}>Категории статей</h1>
		</div>
	);
}

import styles from "./VacancyCard.module.css";
import Image from "next/image";

export default function VacancyCard() {
	return (
		<div className={styles.vacancyCard}>
			<h3 className={styles.vacancyTitle}>Должность</h3>
			<div className={styles.vacancySection}>
				<h4 className={styles.sectionTitle}>Требования</h4>
				<p className={styles.sectionText}>
					Текст про требования текст про требования текст про требования текст
					про требования текст про требования
				</p>
			</div>
			<div className={styles.vacancySection}>
				<h4 className={styles.sectionTitle}>Обязанности</h4>
				<p className={styles.sectionText}>
					Текст про обязаности текст про обязаности текст про обязаности текст
					про обязаности текст про обязаности
				</p>
			</div>
			<div className={styles.vacancySection}>
				<h4 className={styles.sectionTitle}>Условия</h4>
				<p className={styles.sectionText}>
					Текст про условия текст про условия текст про условиях текст про
					условиях текст про условиях текст про условиях
				</p>
			</div>
			<div className={styles.vacancySection}>
				<h4 className={styles.sectionTitle}>Звоните</h4>
				<div className={styles.phoneSection}>
					<Image
						alt="Телефон"
						src="/icons-orders/icon-phone.svg"
						width={24}
						height={24}
					/>
					<a href="tel:+79042713590" className={styles.phoneNumber}>
						+7 904 271 35 90
					</a>
				</div>
			</div>
		</div>
	);
}

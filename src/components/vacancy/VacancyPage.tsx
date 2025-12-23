import styles from "./VacancyPage.module.css";
import VacancyCard from "./VacancyCard";

export default function VacancyPage() {
	return (
		<div className={styles.vacanciesSection}>
			<h1 className={styles.vacanciesTitle}>Вакансии</h1>
			<div className={styles.vacanciesGrid}>
				<div className={styles.vacanciesRow}>
					<VacancyCard />
					<VacancyCard />
					<VacancyCard />
				</div>
				<div className={styles.vacanciesRow}>
					<VacancyCard />
					<VacancyCard />
					<VacancyCard />
				</div>
			</div>
		</div>
	);
}

import { CurrentSettingsProps } from "../../types/site-settings";
import styles from "./CurrentSettings.module.css";

export const CurrentSettings = ({ settings }: CurrentSettingsProps) => {
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>Текущие настройки:</h3>
			<div className={styles.details}>
				<div className={styles.detailItem}>
					<strong>Заголовок:</strong> {settings.siteTitle}
				</div>
				<div className={styles.detailItem}>
					<strong>Ключевых слов:</strong> {settings.siteKeywords?.length || 0}
				</div>
				<div className={styles.detailItem}>
					<strong>Тематик:</strong> {settings.semanticCore?.length || 0}
				</div>
				<div className={styles.detailItem}>
					<strong>Обновлено:</strong>{" "}
					{new Date(settings.updatedAt).toLocaleString("ru-RU")}
				</div>
			</div>
		</div>
	);
};

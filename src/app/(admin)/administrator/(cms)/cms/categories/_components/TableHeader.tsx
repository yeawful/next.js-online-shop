import { ImageIcon } from "lucide-react";
import styles from "./TableHeader.module.css";

export const TableHeader = () => {
	return (
		<div className={styles.container}>
			<div className={styles.grid}>
				<div className={styles.headerCell}></div>
				<div
					className={`${styles.headerCell} ${styles.sortableCell} ${styles.centerContent}`}
					title="Сортировать по ID"
				>
					ID
				</div>
				<div
					className={`${styles.headerCell} ${styles.centerContent}`}
					title="Изображение категории"
				>
					<ImageIcon className={styles.icon} />
				</div>

				<div
					className={`${styles.headerCell} ${styles.sortableCell}`}
					title="Сортировать по названию"
				>
					Название
				</div>
				<div
					className={`${styles.headerCell} ${styles.sortableCell}`}
					title="Сортировать по алиасу"
				>
					Алиас
				</div>
				<div className={styles.headerCell}>Описание</div>
				<div className={`${styles.headerCell} ${styles.centerContent}`}>
					Ключевые слова
				</div>
				<div
					className={`${styles.headerCell} ${styles.sortableCell} ${styles.centerContent}`}
					title="Сортировать по автору"
				>
					Автор
				</div>
				<div
					className={`${styles.headerCell} ${styles.sortableCell}`}
					title="Сортировать по дате создания"
				>
					Создана
				</div>
				<div className={`${styles.headerCell} ${styles.centerContent}`}>
					Действия
				</div>
			</div>
		</div>
	);
};

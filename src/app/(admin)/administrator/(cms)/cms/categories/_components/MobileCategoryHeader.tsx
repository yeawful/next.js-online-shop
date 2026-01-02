import { MobileCategoryHeaderProps } from "../../types";
import styles from "./MobileCategoryHeader.module.css";

export const MobileCategoryHeader = ({
	category,
	displayNumericId,
}: MobileCategoryHeaderProps) => (
	<div className={styles.container}>
		<div className={styles.header}>
			<span className={styles.orderNumber} title="Порядковый номер">
				{displayNumericId || "—"}
			</span>
			<h3 className={styles.title} title={category.name}>
				{category.name}
			</h3>
		</div>

		<div className={styles.meta}>
			<code className={styles.slug} title="Ссылка (slug)">
				{category.slug}
			</code>
			<span
				className={styles.date}
				title={`Дата создания: ${new Date(category.createdAt).toLocaleDateString("ru-RU")}`}
			>
				{new Date(category.createdAt).toLocaleDateString("ru-RU")}
			</span>
		</div>
	</div>
);

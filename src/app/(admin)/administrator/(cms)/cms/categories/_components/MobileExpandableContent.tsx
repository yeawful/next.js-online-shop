import React from "react";
import { MobileExpandableContentProps } from "../../types";
import styles from "./MobileExpandableContent.module.css";

export const MobileExpandableContent = ({
	category,
	onDelete,
	onEdit,
}: MobileExpandableContentProps) => {
	const handleEdit = (e: React.MouseEvent) => {
		e.stopPropagation();
		window.scrollTo({ top: 0, behavior: "smooth" });
		onEdit(category);
	};
	const handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		onDelete(category._id.toString());
	};

	return (
		<div className={styles.container}>
			{category.description && (
				<div className={styles.section}>
					<div className={styles.sectionTitle}>Описание</div>
					<div className={styles.description} title={category.description}>
						{category.description}
					</div>
				</div>
			)}

			<div className={styles.section}>
				<div className={styles.sectionTitle}>Автор</div>
				<div className={styles.author} title={category.author || "Неизвестен"}>
					{category.author || (
						<span className={styles.unknownAuthor}>Неизвестен</span>
					)}
				</div>
			</div>

			{(category.keywords || []).length > 0 && (
				<div className={styles.section}>
					<div className={styles.sectionTitle}>Ключевые слова</div>
					<div className={styles.keywordsContainer}>
						{(category.keywords || []).map((keyword, index) => (
							<span key={index} className={styles.keyword} title={keyword}>
								{keyword}
							</span>
						))}
					</div>
				</div>
			)}

			<div className={styles.actions}>
				<button
					onClick={handleEdit}
					className={styles.editButton}
					title="Редактировать категорию"
				>
					Редактировать
				</button>
				<button
					onClick={handleDelete}
					className={styles.deleteButton}
					title="Удалить категорию"
				>
					Удалить
				</button>
			</div>
		</div>
	);
};

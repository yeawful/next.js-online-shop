import React from "react";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { DragHandle } from "./DragHandle";
import { SortableItemProps } from "../../types";
import styles from "./DesktopCategoryRow.module.css";

export const DesktopCategoryRow = ({
	category,
	displayNumericId,
	onDelete,
	onEdit,
	isDragging = false,
}: SortableItemProps) => {
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
		<div className={`${styles.container} ${isDragging ? styles.dragging : ""}`}>
			<div className={styles.grid}>
				<div className={styles.cell}>
					<DragHandle />
				</div>

				<div className={`${styles.cell} ${styles.centerContent}`}>
					<span className={styles.orderNumber} title="Порядковый номер">
						{displayNumericId || "-"}
					</span>
				</div>

				<div className={`${styles.cell} ${styles.imageContainer}`}>
					{category.image ? (
						<Image
							src={category.image}
							alt={category.imageAlt || category.name}
							width={50}
							height={50}
							className={styles.categoryImage}
							title={category.imageAlt}
						/>
					) : (
						<div className={styles.noImage}>
							<span className={styles.noImageText}>Нет</span>
						</div>
					)}
				</div>

				<div className={styles.cell}>
					<div className={styles.name} title={category.name}>
						{category.name}
					</div>
				</div>

				<div className={styles.cell}>
					<div className={styles.slug} title={`Ссылка: ${category.slug}`}>
						{category.slug}
					</div>
				</div>

				<div className={styles.cell}>
					<div
						className={`${styles.description} ${!category.description ? styles.noDescription : ""}`}
						title={category.description || "Нет описания"}
					>
						{category.description || <span>—</span>}
					</div>
				</div>

				<div className={styles.cell}>
					<div className={styles.keywordsContainer}>
						{category.keywords && category.keywords.length > 0 ? (
							category.keywords.map((keyword, index) => (
								<span key={index} className={styles.keyword} title={keyword}>
									{keyword}
								</span>
							))
						) : (
							<span className={styles.noKeywords} title="Нет ключевых слов">
								—
							</span>
						)}
					</div>
				</div>

				<div className={`${styles.cell} ${styles.centerContent}`}>
					<div
						className={`${styles.author} ${!category.author ? styles.noAuthor : ""}`}
						title={category.author || "Автор неизвестен"}
					>
						{category.author || <span>—</span>}
					</div>
				</div>

				<div className={styles.cell}>
					<div
						className={styles.date}
						title={`Дата создания: ${new Date(category.createdAt).toLocaleDateString("ru-RU")}`}
					>
						{new Date(category.createdAt).toLocaleDateString("ru-RU")}
					</div>
				</div>

				<div className={styles.cell}>
					<div className={styles.actions}>
						<button
							onClick={handleEdit}
							className={styles.editButton}
							title="Редактировать категорию"
						>
							<Edit className={styles.actionIcon} />
						</button>
						<button
							onClick={handleDelete}
							className={styles.deleteButton}
							title="Удалить категорию"
						>
							<Trash2 className={styles.actionIcon} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

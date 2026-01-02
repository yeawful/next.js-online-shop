import { CatalogGridProps } from "@/types/catalogGridProps";
import GridCategoryBlock from "./GridCategoryBlock";
import styles from "./CatalogGrid.module.css";

const CatalogGrid = ({
	categories,
	isEditing,
	draggedCategory,
	hoveredCategoryId,
	onDragStartAction,
	onDragOverAction,
	onDragLeaveAction,
	onDropAction,
}: CatalogGridProps) => {
	return (
		<div className={styles.grid}>
			{categories.map((category, index) => (
				<div
					key={category._id}
					className={`${category.mobileColSpan} ${category.tabletColSpan} ${
						category.colSpan
					} ${styles.categoryItem} ${
						isEditing ? styles.categoryItemEditing : ""
					} ${
						hoveredCategoryId === category._id ? styles.categoryItemHovered : ""
					}`}
					onDragOver={(e) => onDragOverAction(e, category._id)}
					onDragLeave={onDragLeaveAction}
					onDrop={(e) => onDropAction(e, category._id)}
				>
					<div
						className={`${styles.categoryContent} ${
							draggedCategory?._id === category._id
								? styles.categoryContentDragged
								: ""
						}`}
						draggable={isEditing}
						onDragStart={() => onDragStartAction(category)}
					>
						<GridCategoryBlock
							slug={category.slug}
							title={category.title}
							img={category.img}
							priority={index < 4}
						/>
					</div>
				</div>
			))}
		</div>
	);
};

export default CatalogGrid;

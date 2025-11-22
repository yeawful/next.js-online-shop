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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const getCategoryClasses = (category: any) => {
		const classes = [styles.categoryItem];

		if (isEditing) {
			classes.push(styles.categoryItemEditing);
		}

		if (hoveredCategoryId === category._id) {
			classes.push(styles.categoryItemHovered);
		}

		if (category.mobileColSpan === "col-span-2") {
			classes.push(styles.mobileColSpan2);
		}

		if (category.tabletColSpan === "md:col-span-1") {
			classes.push(styles.tabletColSpan1);
		} else if (category.tabletColSpan === "md:col-span-2") {
			classes.push(styles.tabletColSpan2);
		}

		if (category.colSpan === "col-span-2") {
			classes.push(styles.colSpan2);
		} else if (category.colSpan === "xl:col-span-2") {
			classes.push(styles.desktopColSpan2);
		}

		return classes.join(" ");
	};

	return (
		<div className={styles.catalogGrid}>
			{categories.map((category, index) => (
				<div
					key={category._id}
					className={getCategoryClasses(category)}
					onDragOver={(e) => onDragOverAction(e, category._id)}
					onDragLeave={onDragLeaveAction}
					onDrop={(e) => onDropAction(e, category._id)}
				>
					<div
						className={`${styles.categoryContent} ${
							draggedCategory?._id === category._id
								? styles.categoryContentDragging
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

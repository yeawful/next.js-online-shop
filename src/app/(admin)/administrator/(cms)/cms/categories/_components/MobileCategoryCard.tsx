import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { DragHandle } from "./DragHandle";
import { MobileCategoryHeader } from "./MobileCategoryHeader";
import { MobileExpandableContent } from "./MobileExpandableContent";
import { SortableItemProps } from "../../types";
import styles from "./MobileCategoryCard.module.css";

export const MobileCategoryCard = ({
	category,
	displayNumericId,
	onDelete,
	onEdit,
	isDragging = false,
}: SortableItemProps) => {
	const [isExpanded, setIsExpended] = useState(false);

	const toggleIconClass = isExpanded
		? `${styles.toggleIcon} ${styles.toggleIconExpanded}`
		: styles.toggleIcon;

	return (
		<div
			className={`${styles.container} ${isDragging ? styles.dragging : ""}`}
			onClick={() => setIsExpended(!isExpanded)}
		>
			<div className={styles.header}>
				<div className={styles.content}>
					<div className={styles.innerHeader}>
						<DragHandle />
						<MobileCategoryHeader
							category={category}
							displayNumericId={displayNumericId}
						/>
					</div>
				</div>

				<button className={styles.toggleButton}>
					<ChevronDown className={toggleIconClass} />
				</button>
			</div>
			{isExpanded && (
				<MobileExpandableContent
					category={category}
					onDelete={onDelete}
					onEdit={onEdit}
				/>
			)}
		</div>
	);
};

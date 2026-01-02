import { useEffect, useState } from "react";
import { DesktopCategoryRow } from "./DesktopCategoryRow";
import { MobileCategoryCard } from "./MobileCategoryCard";
import { SortableItemProps } from "../../types";
import styles from "./SortableItem.module.css";

export const SortableItem = ({
	category,
	displayNumericId,
	onDelete,
	onEdit,
}: SortableItemProps) => {
	const [isMobileView, setIsMobileView] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobileView(window.innerWidth < 1024);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);

		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	if (isMobileView) {
		return (
			<div className={styles.mobileView}>
				<MobileCategoryCard
					category={category}
					displayNumericId={displayNumericId}
					onDelete={onDelete}
					onEdit={onEdit}
				/>
			</div>
		);
	}

	return (
		<div className={styles.desktopView}>
			<DesktopCategoryRow
				category={category}
				displayNumericId={displayNumericId}
				onDelete={onDelete}
				onEdit={onEdit}
			/>
		</div>
	);
};

export default SortableItem;

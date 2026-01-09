import { GripVertical } from "lucide-react";
import styles from "./DragHandle.module.css";

export const DragHandle = () => {
	return (
		<div className={styles.dragHandle} title="Перетащить для сортировки">
			<GripVertical className={styles.icon} />
		</div>
	);
};

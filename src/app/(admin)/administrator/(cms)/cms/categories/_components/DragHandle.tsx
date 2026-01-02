import React from "react";
import { DragHandleProps } from "../../types";
import styles from "./DragHandle.module.css";

export const DragHandle = React.forwardRef<HTMLDivElement, DragHandleProps>(
	() => (
		<div className={styles.dragHandle} title="Перетащить для сортировки">
			<div className={styles.dotsContainer}>
				<div className={styles.dot}></div>
				<div className={styles.dot}></div>
				<div className={styles.dot}></div>
			</div>
		</div>
	)
);

DragHandle.displayName = "DragHandle";

"use client";

import styles from "./InStockToggle.module.css";

interface InStockToggleProps {
	checked: boolean;
	onChangeAction: (checked: boolean) => void;
}

const InStockToggle = ({ checked, onChangeAction }: InStockToggleProps) => {
	return (
		<div className={styles.inStockToggle}>
			<label className={styles.toggleLabel}>
				<input
					type="checkbox"
					id="inStock"
					checked={checked}
					onChange={(e) => onChangeAction(e.target.checked)}
					className={styles.toggleInput}
				/>
				<div className={styles.toggleTrack}></div>
				<div className={styles.toggleThumb}></div>
				<span className={styles.toggleText}>В наличии</span>
			</label>
		</div>
	);
};

export default InStockToggle;

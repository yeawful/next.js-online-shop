import { memo } from "react";
import SelectedIcon from "./SelectedIcon";
import styles from "./SelectionCheckbox.module.css";

interface SelectionCheckboxProps {
	isSelected: boolean;
	onSelectionChange: (isSelected: boolean) => void;
}

const SelectionCheckbox = memo(function SelectionCheckbox({
	isSelected,
	onSelectionChange,
}: SelectionCheckboxProps) {
	return (
		<label className={styles.label}>
			<input
				type="checkbox"
				checked={isSelected}
				onChange={(e) => onSelectionChange(e.target.checked)}
				className={styles.input}
			/>
			<span
				className={`
          ${styles.checkbox}
          ${isSelected ? styles.checkboxSelected : styles.checkboxUnselected}
        `}
			>
				{isSelected && <SelectedIcon />}
			</span>
		</label>
	);
});

export default SelectionCheckbox;

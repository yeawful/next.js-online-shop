import styles from "./CustomCheckbox.module.css";

interface CustomCheckboxProps {
	name: string;
	label: string;
	checked: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomCheckbox = ({
	name,
	label,
	checked,
	onChange,
}: CustomCheckboxProps) => {
	return (
		<label className={styles.label}>
			<div className={styles.checkboxContainer}>
				<input
					type="checkbox"
					name={name}
					checked={checked}
					onChange={onChange}
					className={styles.hiddenCheckbox}
				/>
				<div
					className={`${styles.customCheckbox} ${
						checked ? styles.customCheckboxChecked : ""
					}`}
				>
					{checked && (
						<svg
							className={styles.checkmark}
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={3}
								d="M5 13l4 4L19 7"
							/>
						</svg>
					)}
				</div>
			</div>
			<span className={styles.labelText}>{label}</span>
		</label>
	);
};

export default CustomCheckbox;

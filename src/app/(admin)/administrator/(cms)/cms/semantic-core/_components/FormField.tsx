import { FormFieldProps } from "../../types/site-settings";
import styles from "./FormField.module.css";

export const FormField = ({
	label,
	value,
	onChange,
	type,
	placeholder,
	hint,
	rows = 3,
	showCommaHint = false,
	disabled = false,
}: FormFieldProps) => {
	const inputClass = disabled
		? `${styles.input} ${styles.input}:disabled`
		: styles.input;

	const textareaClass = disabled
		? `${styles.textarea} ${styles.input}:disabled`
		: styles.textarea;

	return (
		<div className={styles.container}>
			<label className={styles.label}>
				{label}
				{showCommaHint && (
					<span className={styles.commaHint}>(через запятую)</span>
				)}
			</label>
			{type === "textarea" ? (
				<textarea
					value={value}
					onChange={(e) => onChange(e.target.value)}
					rows={rows}
					className={textareaClass}
					placeholder={placeholder}
					disabled={disabled}
				/>
			) : (
				<input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className={inputClass}
					placeholder={placeholder}
					disabled={disabled}
				/>
			)}
			<p className={styles.hint}>{hint}</p>
		</div>
	);
};

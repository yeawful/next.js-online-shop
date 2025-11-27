import { ChangeEvent } from "react";
import styles from "./PersonInput.module.css";

interface PersonInputProps {
	id: string;
	label: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PersonInput = ({ id, label, value, onChange }: PersonInputProps) => {
	return (
		<div>
			<label htmlFor={id} className={styles.label}>
				{label}
			</label>
			<input
				type="text"
				id={id}
				value={value}
				onChange={onChange}
				className={styles.input}
			/>
		</div>
	);
};

export default PersonInput;

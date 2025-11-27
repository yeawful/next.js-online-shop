"use client";

import { ChangeEvent } from "react";
import styles from "./EmailInput.module.css";

interface EmailInputProps {
	value?: string;
	onChangeAction: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput = ({ value, onChangeAction }: EmailInputProps) => {
	return (
		<div>
			<label htmlFor="email" className={styles.label}>
				E-mail
			</label>
			<input
				id="email"
				type="email"
				value={value}
				onChange={onChangeAction}
				className={styles.input}
			/>
		</div>
	);
};

export default EmailInput;

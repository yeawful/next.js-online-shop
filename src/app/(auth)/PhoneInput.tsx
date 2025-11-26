"use client";

import { ChangeEvent } from "react";
import { InputMask } from "@react-input/mask";
import styles from "./PhoneInput.module.css";

interface PhoneInputProps {
	value: string;
	onChangeAction: (e: ChangeEvent<HTMLInputElement>) => void;
}

const PhoneInput = ({ value, onChangeAction }: PhoneInputProps) => {
	return (
		<div>
			<label htmlFor="phone" className={styles.label}>
				Телефон
			</label>
			<InputMask
				mask="+7 (___) ___-__-__"
				replacement={{ _: /\d/ }}
				id="phone"
				type="text"
				value={value}
				placeholder="+7 (___) ___-__-__"
				onChange={onChangeAction}
				className={styles.input}
				showMask={true}
				onFocus={(e) => {
					if (e.target.value === "+7") {
						e.target.setSelectionRange(2, 2);
					}
				}}
			/>
		</div>
	);
};

export default PhoneInput;

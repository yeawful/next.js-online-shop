"use client";

import { InputMask } from "@react-input/mask";
import { ChangeEvent } from "react";
import styles from "./CardInput.module.css";

interface CardInputProps {
	value?: string;
	onChangeAction: (e: ChangeEvent<HTMLInputElement>) => void;
	disabled: boolean;
}

const CardInput = ({ value, onChangeAction, disabled }: CardInputProps) => {
	return (
		<div className={styles.cardContainer}>
			<label htmlFor="card" className={styles.label}>
				Номер карты лояльности
			</label>
			<InputMask
				mask="____ ____ ____ ____"
				replacement={{ _: /\d/ }}
				id="card"
				value={value}
				onChange={onChangeAction}
				disabled={disabled}
				placeholder={disabled ? "" : "0000 0000 0000 0000"}
				className={`${styles.input} ${disabled ? styles.inputDisabled : ""}`}
			/>
		</div>
	);
};

export default CardInput;

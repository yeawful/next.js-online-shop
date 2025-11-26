"use client";

import { ChangeEvent } from "react";
import Image from "next/image";
import styles from "./CheckboxCard.module.css";

interface CheckboxNoCardProps {
	checked: boolean;
	onChangeAction: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxCard = ({ checked, onChangeAction }: CheckboxNoCardProps) => {
	return (
		<div className={styles.checkboxContainer}>
			<label htmlFor="hasCard" className={styles.checkboxLabel}>
				<input
					type="checkbox"
					id="hasCard"
					checked={checked}
					onChange={onChangeAction}
					className={styles.checkboxInput}
				/>
				<span
					className={`${styles.checkboxCustom} ${
						checked ? styles.checkboxCustomChecked : ""
					}`}
				>
					{checked && (
						<Image
							src="/icons-auth/icon-has.svg"
							alt={checked ? "Нет карты лояльности" : "Есть карта лояльности"}
							width={12}
							height={12}
							className={styles.checkboxIcon}
						/>
					)}
				</span>
				<span className={styles.checkboxText}>У меня нет карты лояльности</span>
			</label>
		</div>
	);
};

export default CheckboxCard;

"use client";

import styles from "./GenderSelect.module.css";

interface GenderSelectProps {
	value: string;
	onChangeAction: (gender: string) => void;
}

const GenderSelect = ({ value, onChangeAction }: GenderSelectProps) => {
	const genders = [
		{ id: "male", label: "Мужской" },
		{ id: "female", label: "Женский" },
	];

	return (
		<div className={styles.genderContainer}>
			<p className={styles.label}>Пол</p>
			<div className={styles.genderGroup}>
				{genders.map((gender) => (
					<label
						key={gender.id}
						className={`${styles.genderLabel} ${
							value === gender.id ? styles.genderLabelActive : ""
						}`}
					>
						<input
							type="radio"
							value={gender.id}
							checked={value === gender.id}
							onChange={() => onChangeAction(gender.id)}
							className={styles.genderInput}
						/>
						{gender.label}
					</label>
				))}
			</div>
		</div>
	);
};

export default GenderSelect;

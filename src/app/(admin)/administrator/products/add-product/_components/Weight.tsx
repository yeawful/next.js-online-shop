import styles from "./Weight.module.css";

interface WeightProps {
	weight: string;
	onChangeAction: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Weight = ({ onChangeAction, weight }: WeightProps) => {
	return (
		<div className={styles.container}>
			<label className={styles.label}>
				Вес (кг) <span className={styles.required}>*</span>
			</label>
			<input
				type="number"
				name="weight"
				step="0.01"
				value={weight}
				onChange={onChangeAction}
				className={styles.input}
			/>
		</div>
	);
};

export default Weight;

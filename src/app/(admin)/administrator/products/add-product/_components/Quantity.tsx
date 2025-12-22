import styles from "./Quantity.module.css";

interface QuantityProps {
	quantity: string;
	onChangeAction: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Quantity = ({ onChangeAction, quantity }: QuantityProps) => {
	return (
		<div className={styles.container}>
			<label className={styles.label}>
				Количество <span className={styles.required}>*</span>
			</label>
			<input
				type="number"
				name="quantity"
				required
				value={quantity}
				onChange={onChangeAction}
				className={styles.input}
			/>
		</div>
	);
};

export default Quantity;

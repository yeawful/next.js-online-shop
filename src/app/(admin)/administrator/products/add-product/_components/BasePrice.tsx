import styles from "./BasePrice.module.css";

interface BasePriceProps {
	basePrice: string;
	onChangeAction: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const BasePrice = ({ onChangeAction, basePrice }: BasePriceProps) => {
	return (
		<div className={styles.container}>
			<label className={styles.label}>
				Базовая цена (руб.) <span className={styles.required}>*</span>
			</label>
			<input
				type="number"
				name="basePrice"
				step="0.01"
				required
				value={basePrice}
				onChange={onChangeAction}
				className={styles.input}
			/>
		</div>
	);
};

export default BasePrice;

import styles from "./Discount.module.css";

interface DiscountProps {
	discount: string;
	onChangeAction: (event: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
}

const Discount = ({
	onChangeAction,
	discount,
	required = false,
}: DiscountProps) => {
	return (
		<div className={styles.container}>
			<label className={styles.label}>
				Скидка (%) {required && <span className={styles.required}>*</span>}
			</label>
			<input
				type="number"
				name="discountPercent"
				required={required}
				value={discount}
				onChange={onChangeAction}
				className={styles.input}
				min="0"
				max="100"
			/>
		</div>
	);
};

export default Discount;

import styles from "./Manufacturer.module.css";

interface ManufacturerProps {
	manufacturer: string;
	onChangeAction: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Manufacturer = ({ onChangeAction, manufacturer }: ManufacturerProps) => {
	return (
		<div className={styles.container}>
			<label className={styles.label}>
				Производитель <span className={styles.required}>*</span>
			</label>
			<input
				type="text"
				name="manufacturer"
				required
				value={manufacturer}
				onChange={onChangeAction}
				className={styles.input}
			/>
		</div>
	);
};

export default Manufacturer;

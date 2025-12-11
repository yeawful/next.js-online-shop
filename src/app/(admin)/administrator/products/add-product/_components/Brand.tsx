import styles from "./Brand.module.css";

interface BrandProps {
	brand: string;
	onChangeAction: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Brand = ({ onChangeAction, brand }: BrandProps) => {
	return (
		<div className={styles.container}>
			<label className={styles.label}>
				Бренд <span className={styles.required}>*</span>
			</label>
			<input
				type="text"
				name="brand"
				required
				value={brand}
				onChange={onChangeAction}
				className={styles.input}
			/>
		</div>
	);
};

export default Brand;

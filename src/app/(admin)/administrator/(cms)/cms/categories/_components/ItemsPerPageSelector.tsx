import styles from "./ItemsPerPageSelector.module.css";

interface ItemsPerPageSelectorProps {
	value: number;
	onChange: (value: number) => void;
}

export const ItemsPerPageSelector = ({
	value,
	onChange,
}: ItemsPerPageSelectorProps) => (
	<div className={styles.container}>
		<span className={styles.label}>Показывать:</span>
		<select
			value={value}
			onChange={(e) => onChange(Number(e.target.value))}
			className={styles.select}
		>
			<option value="2">2</option>
			<option value="5">5</option>
			<option value="10">10</option>
			<option value="20">20</option>
			<option value="50">50</option>
			<option value="100">100</option>
		</select>
	</div>
);

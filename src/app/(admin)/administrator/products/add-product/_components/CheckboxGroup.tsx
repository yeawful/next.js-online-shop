import CustomCheckbox from "./CustomCheckbox";
import styles from "./CheckboxGroup.module.css";

interface CheckboxItem {
	name: string;
	label: string;
	checked: boolean;
}

interface CheckboxGroupProps {
	items: CheckboxItem[];
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
}

const CheckboxGroup = ({
	items,
	onChange,
	className = "",
}: CheckboxGroupProps) => {
	return (
		<div className={`${styles.container} ${className}`}>
			{items.map((item) => (
				<CustomCheckbox
					key={item.name}
					name={item.name}
					label={item.label}
					checked={item.checked}
					onChange={onChange}
				/>
			))}
		</div>
	);
};

export default CheckboxGroup;

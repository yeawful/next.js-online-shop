import styles from "./Description.module.css";

interface DescriptionProps {
	description: string;
	onChangeAction: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Description = ({ onChangeAction, description }: DescriptionProps) => {
	return (
		<div className={styles.container}>
			<label className={styles.label}>
				Описание <span className={styles.required}>*</span>
			</label>
			<input
				type="text"
				name="description"
				required
				value={description}
				onChange={onChangeAction}
				className={styles.input}
			/>
		</div>
	);
};

export default Description;

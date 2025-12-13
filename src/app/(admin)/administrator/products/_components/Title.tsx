import styles from "./Title.module.css";

interface TitleProps {
	title: string;
	onChangeAction: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Title = ({ onChangeAction, title }: TitleProps) => {
	return (
		<div className={styles.container}>
			<label className={styles.label}>
				Название товара <span className={styles.required}>*</span>
			</label>
			<input
				type="text"
				name="title"
				required
				value={title}
				onChange={onChangeAction}
				className={styles.input}
			/>
		</div>
	);
};

export default Title;

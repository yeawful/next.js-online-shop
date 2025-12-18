import styles from "./SaveButton.module.css";

interface SaveButtonProps {
	saving: boolean;
	onClick: () => void;
	className?: string;
}

export default function SaveButton({
	saving,
	onClick,
	className = "",
}: SaveButtonProps) {
	return (
		<div className={styles.container}>
			<button
				onClick={onClick}
				disabled={saving}
				className={`${styles.button} ${className}`}
			>
				{saving ? "Сохранение..." : "Сохранить расписание"}
			</button>
		</div>
	);
}

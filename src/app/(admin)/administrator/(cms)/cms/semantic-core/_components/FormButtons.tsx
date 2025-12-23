import Link from "next/link";
import { FormButtonsProps } from "../../types/site-settings";
import styles from "./FormButtons.module.css";

export const FormButtons = ({ saving, disabled = false }: FormButtonsProps) => {
	return (
		<div className={styles.container}>
			<button
				type="submit"
				disabled={saving || disabled}
				className={styles.submitButton}
			>
				{saving ? "Сохранение..." : "Сохранить настройки"}
			</button>
			<Link href="/administrator/cms" className={styles.backButton}>
				Назад к панели инструментов
			</Link>
		</div>
	);
};

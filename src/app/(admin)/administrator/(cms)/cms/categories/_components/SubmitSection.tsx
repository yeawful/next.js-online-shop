import { Save } from "lucide-react";
import styles from "./SubmitSection.module.css";

const SubmitSection = () => {
	return (
		<>
			<div className={styles.container}>
				<button type="submit" className={styles.submitButton}>
					<Save className={styles.buttonIcon} />
					Сохранить изменения
				</button>
				<button type="button" className={styles.cancelButton}>
					Отмена
				</button>
			</div>
		</>
	);
};

export default SubmitSection;

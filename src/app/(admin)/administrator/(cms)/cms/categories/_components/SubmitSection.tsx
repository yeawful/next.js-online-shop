import { Loader2, Save } from "lucide-react";
import styles from "./SubmitSection.module.css";

interface SubmitSectionProps {
	isSubmitting: boolean;
	isUploading: boolean;
	onCancel: () => void;
}

const SubmitSection = ({
	isSubmitting,
	isUploading,
	onCancel,
}: SubmitSectionProps) => {
	return (
		<>
			{isSubmitting && (
				<div className={styles.uploadingMessage}>
					<div className={styles.uploadingContent}>
						<Loader2 className={styles.uploadingSpinner} />
						{"Создаем категорию..."}
					</div>
				</div>
			)}
			<div className={styles.container}>
				<button
					type="submit"
					disabled={isUploading || isSubmitting}
					className={styles.submitButton}
				>
					<Save className={styles.buttonIcon} />
					Сохранить изменения
				</button>
				<button
					type="button"
					onClick={onCancel}
					disabled={isUploading || isSubmitting}
					className={styles.cancelButton}
				>
					Отмена
				</button>
			</div>
		</>
	);
};

export default SubmitSection;

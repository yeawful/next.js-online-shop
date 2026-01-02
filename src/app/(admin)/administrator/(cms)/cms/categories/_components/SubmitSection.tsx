import { useCategoryStore } from "@/store/categoryStore";
import { Loader2, Save } from "lucide-react";
import { SubmitSectionProps } from "../../types";
import styles from "./SubmitSection.module.css";

export const SubmitSection = ({ onCancel }: SubmitSectionProps) => {
	const { editingId, isSubmitting, isUploading } = useCategoryStore();

	return (
		<>
			{isSubmitting && (
				<div className={styles.submittingNotice}>
					<div className={styles.submittingContent}>
						<Loader2 className={styles.spinnerIcon} />
						{editingId ? "Обновляем категорию" : "Создаем категорию..."}
					</div>
				</div>
			)}
			<div className={styles.buttonsContainer}>
				<button
					type="submit"
					disabled={isUploading || isSubmitting}
					className={styles.submitButton}
				>
					<Save className={styles.buttonIcon} />
					{isSubmitting
						? "Сохранение..."
						: editingId
							? "Сохранить изменения"
							: "Создать категорию"}
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

import { AlertTriangle, Loader, Trash2 } from "lucide-react";
import styles from "./DeleteConfirmationModal.module.css";

export function DeleteConfirmationModal({
	isOpen,
	onClose,
	onConfirm,
	productTitle,
	isDeleting,
}: {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	productTitle: string;
	isDeleting: boolean;
}) {
	if (!isOpen) return null;

	return (
		<div className={styles.overlay}>
			<div className={styles.modal}>
				<div className={styles.content}>
					<h3 className={styles.title}>Подтверждение удаления</h3>
					<p className={styles.message}>
						Вы уверены, что хотите удалить товар{" "}
						<strong>&quot;{productTitle}&quot;</strong>?
					</p>
					<div className={styles.warning}>
						<AlertTriangle size={16} className={styles.warningIcon} />
						<p>
							Это действие нельзя отменить! Товар будет полностью удален из
							системы.
						</p>
					</div>

					<div className={styles.actions}>
						<button
							onClick={onClose}
							disabled={isDeleting}
							className={styles.cancelButton}
						>
							Отмена
						</button>
						<button
							onClick={onConfirm}
							disabled={isDeleting}
							className={styles.deleteButton}
						>
							{isDeleting ? (
								<>
									<Loader size={16} className={styles.spinner} />
									Удаление...
								</>
							) : (
								<>
									<Trash2 size={16} />
									Удалить
								</>
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

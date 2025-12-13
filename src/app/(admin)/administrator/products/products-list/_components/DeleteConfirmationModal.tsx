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
		<div className={styles.modalOverlay}>
			<div className={styles.modalContent}>
				<div className={styles.modalBody}>
					<h3 className={styles.modalTitle}>Подтверждение удаления</h3>
					<p className={styles.modalText}>
						Вы уверены, что хотите удалить товар{" "}
						<strong className={styles.productTitle}>
							&quot;{productTitle}&quot;
						</strong>
						?
					</p>
					<div className={styles.warning}>
						<AlertTriangle className={styles.warningIcon} />
						<p>
							Это действие нельзя отменить! Товар будет полностью удален из
							системы.
						</p>
					</div>

					<div className={styles.buttons}>
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
									<Loader
										className={`${styles.buttonIcon} ${styles.spinner}`}
									/>
									Удаление...
								</>
							) : (
								<>
									<Trash2 className={styles.buttonIcon} />
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

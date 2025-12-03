"use client";

import styles from "./DeleteAccountModal.module.css";

interface DeleteAccountModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	error?: string | null;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
	isOpen,
	onClose,
	onConfirm,
	error,
}) => {
	if (!isOpen) return null;

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContent}>
				<h3 className={styles.modalTitle}>Подтверждение удаления</h3>

				{error && <div className={styles.errorContainer}>{error}</div>}

				<p className={styles.messageText}>
					Вы уверены, что хотите удалить свой аккаунт? Это действие нельзя
					отменить.
				</p>

				<div className={styles.buttonsContainer}>
					<button onClick={onClose} className={styles.cancelButton}>
						Отмена
					</button>
					<button onClick={onConfirm} className={styles.deleteButton}>
						Удалить
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteAccountModal;

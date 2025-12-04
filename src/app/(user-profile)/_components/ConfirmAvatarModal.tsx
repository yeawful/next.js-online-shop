"use client";

import Image from "next/image";
import styles from "./ConfirmAvatarModal.module.css";

interface ConfirmAvatarModalProps {
	isOpen: boolean;
	previewUrl: string;
	isUploading: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}

const ConfirmAvatarModal = ({
	isOpen,
	previewUrl,
	isUploading,
	onConfirm,
	onCancel,
}: ConfirmAvatarModalProps) => {
	if (!isOpen) return null;

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContent}>
				<h3 className={styles.modalTitle}>Подтверждение смены аватара</h3>

				<div className={styles.previewContainer}>
					<Image
						src={previewUrl}
						width={80}
						height={80}
						alt="Превью аватара"
						className={styles.previewImage}
					/>
				</div>

				<p className={styles.modalMessage}>
					Вы уверены, что хотите сменить аватар? Старое изображение будет
					удалено.
				</p>

				<div className={styles.buttonsContainer}>
					<button
						disabled={isUploading}
						onClick={onConfirm}
						className={styles.confirmButton}
					>
						{isUploading ? "Загрузка" : "Да, сменить"}
					</button>
					<button
						onClick={onCancel}
						disabled={isUploading}
						className={styles.cancelButton}
					>
						Отмена
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmAvatarModal;

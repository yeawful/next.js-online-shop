import styles from "./PhoneEditView.module.css";

interface PhoneEditViewProps {
	onCancel: () => void;
	onSave?: () => void;
	isSaving: boolean;
	isSendingOTP: boolean;
	isVerificationMode?: boolean;
}

const PhoneEditView = ({
	onCancel,
	onSave,
	isSaving,
	isSendingOTP,
	isVerificationMode,
}: PhoneEditViewProps) => {
	return (
		<div className={styles.buttonRow}>
			<button onClick={onCancel} className={styles.cancelButton}>
				Отмена
			</button>
			{!isVerificationMode && onSave && (
				<button
					onClick={onSave}
					className={styles.saveButton}
					disabled={isSaving || isSendingOTP}
				>
					{isSaving
						? "Сохранение..."
						: isSendingOTP
							? "Отправка кода"
							: "Сохранить"}
				</button>
			)}
		</div>
	);
};

export default PhoneEditView;

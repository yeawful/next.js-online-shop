import { CatalogAdminControlsProps } from "@/types/catalogAdminControlsProps";
import styles from "./CatalogAdminControls.module.css";

const CatalogAdminControls = ({
	isEditing,
	onToggleEditingAction,
	onResetLayoutAction,
}: CatalogAdminControlsProps) => {
	return (
		<div className={styles.adminControls}>
			<button onClick={onToggleEditingAction} className={styles.editButton}>
				{isEditing ? "Закончить редактирование" : "Изменить расположение"}
			</button>
			{isEditing && (
				<button onClick={onResetLayoutAction} className={styles.resetButton}>
					Сбросить
				</button>
			)}
		</div>
	);
};

export default CatalogAdminControls;

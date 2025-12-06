import { Edit } from "lucide-react";
import styles from "./EditButton.module.css";

const EditButton = ({ onEdit }: { onEdit: () => void }) => {
	return (
		<button onClick={onEdit} className={styles.editButton}>
			<Edit className={styles.editIcon} />
			Редактировать
		</button>
	);
};

export default EditButton;

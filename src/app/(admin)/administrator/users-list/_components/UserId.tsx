import { getShortDecimalId } from "../../../../../utils/admin/shortDecimalId";
import { tableStyles } from "../../styles";
import styles from "./UserId.module.css";

const UserId = ({ userId }: { userId: string }) => {
	return (
		<div
			className={`${tableStyles.colSpans.id} ${tableStyles.border.right} ${styles.container}`}
		>
			<div className={styles.label}>ID:</div>
			<span className={styles.userId}>#{getShortDecimalId(userId)}</span>
		</div>
	);
};

export default UserId;

import { maskedValue } from "../../../../../utils/admin/maskPhone";
import { tableStyles } from "../../styles";
import styles from "./Phone.module.css";

const Phone = ({
	phone,
	phoneVerified,
}: {
	phone: string;
	phoneVerified: boolean;
}) => {
	return (
		<div
			className={`${tableStyles.colSpans.phone} ${tableStyles.border.right} ${styles.container}`}
		>
			<div className={styles.label}>Телефон:</div>
			<div
				className={`${styles.phoneNumber} ${
					phoneVerified ? styles.phoneVerified : styles.phoneNotVerified
				}`}
			>
				{maskedValue(phone)}
			</div>
		</div>
	);
};

export default Phone;

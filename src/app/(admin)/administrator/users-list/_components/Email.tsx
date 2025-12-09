import { CONFIG } from "../../../../../../config/config";
import { tableStyles } from "../../styles";
import styles from "./Email.module.css";

const Email = ({
	email,
	emailVerified,
}: {
	email: string;
	emailVerified: boolean;
}) => {
	const isTemporaryEmail = (email: string): boolean => {
		return email.includes(CONFIG.TEMPORARY_EMAIL_DOMAIN);
	};

	return (
		<div
			className={`${tableStyles.colSpans.email} ${tableStyles.border.right} ${styles.container}`}
		>
			<div className={styles.emailLabel}>Email:</div>
			{!isTemporaryEmail(email) ? (
				<div
					className={`${styles.emailText} ${
						emailVerified ? styles.emailVerified : styles.emailNotVerified
					}`}
				>
					{email}
				</div>
			) : (
				<div className={styles.temporaryEmail}>—</div>
			)}
		</div>
	);
};

export default Email;

import { Cake } from "lucide-react";
import { formatBirthday } from "../../../../../utils/admin/formatBirthday";
import { tableStyles } from "../../styles";
import { isBirthdaySoon } from "../../../../../utils/admin/birthdaySoon";
import styles from "./Person.module.css";

const Person = ({
	name,
	surname,
	birthday,
}: {
	name: string;
	surname: string;
	birthday: string;
}) => {
	const birthdaySoon = isBirthdaySoon(birthday);
	return (
		<div
			className={`${tableStyles.colSpans.name} ${tableStyles.border.right} ${styles.container}`}
		>
			<div className={styles.name}>
				{name} {surname}
			</div>
			{birthdaySoon && (
				<span className={styles.birthdaySoon}>
					<Cake className={styles.birthdayIcon} />
					{formatBirthday(birthday)}
				</span>
			)}
		</div>
	);
};

export default Person;

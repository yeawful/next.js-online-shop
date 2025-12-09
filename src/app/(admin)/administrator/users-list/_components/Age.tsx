import { calculateAge } from "../../../../../utils/admin/calculateAge";
import { tableStyles } from "../../styles";
import styles from "./Age.module.css";

interface AgeProps {
	birthdayDate: string;
}

const Age = ({ birthdayDate }: AgeProps) => {
	const age = calculateAge(birthdayDate);

	return (
		<div
			className={`${tableStyles.colSpans.age} ${tableStyles.border.right} ${styles.container}`}
		>
			{age === 0 ? (
				0
			) : (
				<>
					{age}
					<span className={styles.ageText}>лет</span>
				</>
			)}
		</div>
	);
};

export default Age;

import { formatWeight } from "../../../../../../../utils/formatWeight";
import styles from "./AdditionalInfo.module.css";

interface AdditionalInfoProps {
	brand: string;
	manufacturer: string;
	weight: number;
}

const AdditionalInfo = ({
	brand,
	manufacturer,
	weight,
}: AdditionalInfoProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.rowOdd}>
				<span className={styles.label}>Бренд:</span>
				<span className={styles.value}>{brand}</span>
			</div>
			<div className={styles.rowEven}>
				<span className={styles.label}>Страна производителя:</span>
				<span className={styles.value}>{manufacturer}</span>
			</div>
			<div className={styles.rowOdd}>
				<span className={styles.label}>Упаковка:</span>
				<span className={styles.value}>{formatWeight(weight)}</span>
			</div>
		</div>
	);
};

export default AdditionalInfo;

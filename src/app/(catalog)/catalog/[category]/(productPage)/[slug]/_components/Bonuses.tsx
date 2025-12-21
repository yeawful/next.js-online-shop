import Image from "next/image";
import { getFullEnding } from "@/utils/getWordEnding";
import styles from "./Bonuses.module.css";

const Bonuses = ({ bonus }: { bonus: number }) => {
	const roundedBonus = Math.round(bonus);

	return (
		<div className={styles.container}>
			<Image
				src="/icons-products/icon-green-smile.svg"
				alt="Бонусы"
				width={24}
				height={11}
			/>
			<p className={styles.text}>
				Вы получаете{" "}
				<span className={styles.bonusAmount}>
					{roundedBonus} бонус{getFullEnding(roundedBonus)}
				</span>
			</p>
		</div>
	);
};

export default Bonuses;

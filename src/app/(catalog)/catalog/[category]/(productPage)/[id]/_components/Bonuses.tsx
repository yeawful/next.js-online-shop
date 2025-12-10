import Image from "next/image";
import { getBonusesWord } from "../../../../../../../utils/bonusWord";
import styles from "./Bonuses.module.css";

const Bonuses = ({ bonus }: { bonus: number }) => {
	const roundedBonus = Math.round(bonus);
	const bonusWord = getBonusesWord(roundedBonus);

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
					{roundedBonus} {bonusWord}
				</span>
			</p>
		</div>
	);
};

export default Bonuses;

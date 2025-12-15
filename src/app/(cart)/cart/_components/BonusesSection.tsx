import InStockToggle from "@/components/filter/InStockToggle";
import { CONFIG } from "../../../../../config/config";
import styles from "./BonusesSection.module.css";

interface BonusesSectionProps {
	bonusesCount: number;
	useBonuses: boolean;
	onUseBonusesChange: (value: boolean) => void;
	totalPrice: number;
}

const BonusesSection = ({
	bonusesCount,
	useBonuses,
	onUseBonusesChange,
	totalPrice,
}: BonusesSectionProps) => {
	if (bonusesCount < 0) return null;

	return (
		<div className={styles.container}>
			<div className={styles.toggleRow}>
				<InStockToggle
					checked={useBonuses}
					onChangeAction={onUseBonusesChange}
				/>
				<p>
					Списать{" "}
					{Math.min(
						bonusesCount,
						Math.floor((totalPrice * CONFIG.MAX_BONUSES_PERCENT) / 100)
					)}{" "}
					₽
				</p>
			</div>
			<div className={styles.bonusInfo}>
				{`На карте накоплено ${bonusesCount} ₽`}
			</div>
		</div>
	);
};

export default BonusesSection;

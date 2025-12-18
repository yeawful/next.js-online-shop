import InStockToggle from "@/components/filter/InStockToggle";
import { CONFIG } from "../../../../../config/config";
import { useCartStore } from "@/store/cartStore";
import styles from "./BonusesSection.module.css";

const BonusesSection = () => {
	const { pricing, isOrdered, useBonuses, setUseBonuses } = useCartStore();
	const { totalPrice, maxBonusUse } = pricing;

	if (maxBonusUse <= 0) return null;

	return (
		<div className={styles.container}>
			<div className={styles.toggleRow}>
				<InStockToggle
					checked={useBonuses}
					onChangeAction={isOrdered ? () => {} : setUseBonuses}
				/>
				<p>
					Списать{" "}
					{Math.min(
						maxBonusUse,
						Math.floor((totalPrice * CONFIG.MAX_BONUSES_PERCENT) / 100)
					)}{" "}
					₽
				</p>
			</div>
			<div className={styles.bonusInfo}>
				{`На карте накоплено ${maxBonusUse} ₽`}
			</div>
		</div>
	);
};

export default BonusesSection;

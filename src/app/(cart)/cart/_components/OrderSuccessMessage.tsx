import { CreditCard } from "lucide-react";
import { getFullEnding } from "../../../../utils/getWordEnding";
import { useCartStore } from "@/store/cartStore";
import { CONFIG } from "../../../../../config/config";
import styles from "./OrderSuccessMessage.module.css";

const OrderSuccessMessage = ({
	orderNumber,
}: {
	orderNumber: string | null;
}) => {
	const { pricing, useBonuses } = useCartStore();
	const { totalBonuses, maxBonusUse, totalPrice } = pricing;
	const { setIsOrdered } = useCartStore();

	const handleNewOrder = () => {
		setIsOrdered(false);
		window.location.reload();
	};

	const usedBonuses = Math.min(
		maxBonusUse,
		Math.floor((totalPrice * CONFIG.MAX_BONUSES_PERCENT) / 100)
	);

	return (
		<div className={styles.container}>
			<div className={styles.title}>Заказ оформлен успешно!</div>
			<div className={styles.orderNumber}>
				Номер вашего заказа: <strong>{orderNumber}</strong>
			</div>
			<div className={styles.info}>
				Вы можете оплатить заказ при получении курьеру наличными или картой. С
				Вами свяжутся для подтверждения времени доставки.
			</div>
			{useBonuses && (
				<div className={styles.bonusInfo}>
					<CreditCard size={16} className={styles.bonusIcon} />
					{usedBonuses} бонус
					{getFullEnding(usedBonuses)} будет списано после подтверждения оплаты
				</div>
			)}
			<div className={styles.bonusInfo}>
				<CreditCard size={16} className={styles.bonusIcon} />
				После доставки вам будет начислено {totalBonuses} бонус
				{getFullEnding(totalBonuses)}
			</div>
			<button
				onClick={handleNewOrder}
				className={`${styles.button} ${styles.buttonPrimary}`}
			>
				Вернуться на главную
			</button>
			<button onClick={handleNewOrder} className={styles.refreshButton}>
				Обновить страницу
			</button>
		</div>
	);
};

export default OrderSuccessMessage;

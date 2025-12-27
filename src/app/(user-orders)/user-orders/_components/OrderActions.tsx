import IconVision from "@/components/ui/svg/IconVision";
import styles from "./OrderActions.module.css";

interface OrderActionsProps {
	showOrderDetails: boolean;
	onToggleDetails: () => void;
}

export const OrderActions: React.FC<OrderActionsProps> = ({
	showOrderDetails,
	onToggleDetails,
}) => {
	return (
		<div className={styles.container}>
			<button className={styles.toggleButton} onClick={onToggleDetails}>
				<IconVision showPassword={!showOrderDetails} />
				{showOrderDetails ? "Скрыть заказ" : "Просмотреть заказ"}
			</button>
		</div>
	);
};

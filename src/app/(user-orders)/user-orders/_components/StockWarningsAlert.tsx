import styles from "./StockWarningsAlert.module.css";

interface StockWarningsAlertProps {
	warnings: string[];
	hasStockIssues: boolean;
}

export const StockWarningsAlert: React.FC<StockWarningsAlertProps> = ({
	warnings,
	hasStockIssues,
}) => {
	if (warnings.length === 0) return null;

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>Внимание: проблемы с количеством товаров</h3>
			<ul className={styles.list}>
				{warnings.map((warning, index) => (
					<li key={index} className={styles.item}>
						{warning}
					</li>
				))}
			</ul>
			{hasStockIssues && (
				<p className={styles.warning}>
					Невозможно создать повторный заказ до решения проблем с количеством
					товаров. Оформите заказ через добавление товаров в корзину
				</p>
			)}
		</div>
	);
};

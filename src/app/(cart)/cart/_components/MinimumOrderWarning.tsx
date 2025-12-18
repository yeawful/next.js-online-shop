import styles from "./MinimumOrderWarning.module.css";

const MinimumOrderWarning = ({
	isMinimumReached,
}: {
	isMinimumReached: boolean;
}) => {
	if (isMinimumReached) return null;
	return <div className={styles.container}>Минимальная сумма заказа 1000р</div>;
};

export default MinimumOrderWarning;

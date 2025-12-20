import styles from "./AdminOrdersHeader.module.css";

interface AdminOrdersHeaderProps {
	stats: {
		nextThreeDaysOrders: number;
	} | null;
}

const AdminOrdersHeader = ({ stats }: AdminOrdersHeaderProps) => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Заказы</h1>
			{stats && (
				<div className={styles.statsBadge}>{stats.nextThreeDaysOrders}</div>
			)}
		</div>
	);
};

export default AdminOrdersHeader;

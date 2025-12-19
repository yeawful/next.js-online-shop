import { useState } from "react";
import { CONFIG } from "../../../../../config/config";
import { Order } from "@/types/order";
import OrderCard from "./OrderCard";
import styles from "./UserOrdersList.module.css";

const UserOrdersList = ({ orders }: { orders: Order[] }) => {
	const [visibleOrdersCount, setVisibleOrdersCount] = useState<number>(
		CONFIG.ITEMS_PER_ORDERS_PAGE
	);
	const visibleOrders = orders.slice(0, visibleOrdersCount);
	const hasMoreOrders = orders.length > visibleOrdersCount;

	const handleShowMore = () => {
		setVisibleOrdersCount(
			(prevCount) => prevCount + CONFIG.ITEMS_PER_ORDERS_PAGE
		);
	};

	return (
		<div className={styles.container}>
			<div className={styles.ordersList}>
				{visibleOrders.map((order) => (
					<OrderCard key={order._id} order={order} />
				))}
			</div>

			{hasMoreOrders && (
				<div className={styles.loadMoreContainer}>
					<button className={styles.loadMoreButton} onClick={handleShowMore}>
						Показать еще
					</button>
				</div>
			)}
		</div>
	);
};

export default UserOrdersList;

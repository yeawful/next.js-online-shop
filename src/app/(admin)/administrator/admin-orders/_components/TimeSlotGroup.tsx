import Image from "next/image";
import { Order } from "@/types/order";
import AdminOrderCard from "./AdminOrderCard";
import { useState, useEffect } from "react";
import CityFilterButtons from "./CityFilterButtons";
import { useGetAdminOrdersQuery } from "@/store/redux/api/ordersApi";
import { getUniqueCities } from "../utils/getUniqueCities";
import styles from "./TimeSlotGroup.module.css";

interface TimeSlotGroupProps {
	timeSlot: string;
	orderIds: string[];
}

const TimeSlotGroup = ({ timeSlot, orderIds }: TimeSlotGroupProps) => {
	const { data } = useGetAdminOrdersQuery();
	const [selectedCity, setSelectedCity] = useState<string>("Все города");
	const [localOrders, setLocalOrders] = useState<Order[]>([]);

	useEffect(() => {
		if (data?.orders) {
			const filteredOrders = data.orders.filter((order) =>
				orderIds.includes(order._id)
			);
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setLocalOrders(filteredOrders);
		}
	}, [data?.orders, orderIds]);

	const cities = getUniqueCities(localOrders);

	const filteredSlotOrders =
		selectedCity === "Все города"
			? localOrders
			: localOrders.filter(
					(order) => order.deliveryAddress?.city === selectedCity
				);

	const startTime = timeSlot.split("-")[0];

	const completedOrdersCount = filteredSlotOrders.filter(
		(order) => order.status === "confirmed"
	).length;

	const handleCitySelect = (city: string) => {
		setSelectedCity(city);
	};

	return (
		<div key={timeSlot}>
			<div className={styles.timeSlotHeader}>
				<div className={styles.timeSlotContainer}>
					<Image
						alt={timeSlot}
						src="/icons-orders/icon-clock.svg"
						width={24}
						height={24}
						className={styles.iconClock}
					/>
					<span className={styles.slotTime}>{startTime}</span>
				</div>
				<div className={styles.completedContainer}>
					<Image
						alt={timeSlot}
						src="/icons-orders/icon-check.svg"
						width={24}
						height={24}
					/>
					<div>
						<span className={styles.completedCount}>
							{completedOrdersCount}
						</span>
						<span className={styles.completedDivider}>{" / "}</span>
						<span className={styles.completedCount}>
							{filteredSlotOrders.length}
						</span>
					</div>
				</div>
			</div>
			{cities.length > 1 && (
				<CityFilterButtons
					cities={cities}
					slotOrders={localOrders}
					selectedCity={selectedCity}
					onCitySelect={handleCitySelect}
				/>
			)}
			<div className={styles.ordersContainer}>
				{filteredSlotOrders.map((order) => (
					<AdminOrderCard key={order._id} orderId={order._id} />
				))}
			</div>
		</div>
	);
};

export default TimeSlotGroup;

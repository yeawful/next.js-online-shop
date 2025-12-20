import { useGetAdminOrdersQuery } from "@/store/redux/api/ordersApi";
import TimeSlotGroup from "./TimeSlotGroup";
import styles from "./TimeSlotSection.module.css";

interface TimeSlotSectionProps {
	orderIds: string[];
}

const TimeSlotSection = ({ orderIds }: TimeSlotSectionProps) => {
	const { data } = useGetAdminOrdersQuery();

	const orders =
		data?.orders?.filter((order) => orderIds.includes(order._id)) || [];

	const timeSlots = [...new Set(orders.map((o) => o.deliveryTimeSlot))].sort();

	const timeSlotGroups = timeSlots.map((timeSlot) => ({
		timeSlot,
		orderIds: orders
			.filter((order) => order.deliveryTimeSlot === timeSlot)
			.map((order) => order._id),
	}));

	if (orderIds.length === 0) {
		return (
			<div className={styles.container}>
				<div className={styles.empty}>Нет активных заказов на эту дату</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{timeSlotGroups.map(({ timeSlot, orderIds }) => (
				<TimeSlotGroup key={timeSlot} timeSlot={timeSlot} orderIds={orderIds} />
			))}
		</div>
	);
};

export default TimeSlotSection;

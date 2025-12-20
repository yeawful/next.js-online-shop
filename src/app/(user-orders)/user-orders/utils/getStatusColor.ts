import { Order } from "@/types/order";
import styles from "./statusColors.module.css";

export const getStatusColor = (order: Order): string => {
	if (order.paymentMethod === "online") {
		if (order.paymentStatus === "paid" && order.status === "confirmed") {
			return styles.bgLight;
		} else if (order.paymentStatus === "failed") {
			return styles.bgError;
		} else if (
			order.paymentStatus === "waiting" &&
			order.status === "pending"
		) {
			return styles.bgLightWithText;
		}
	}

	if (order.paymentMethod === "cash_on_delivery") {
		if (order.status === "pending" && order.paymentStatus === "pending") {
			return styles.bgSuccessLight;
		} else if (order.status === "confirmed") {
			return styles.bgLight;
		}
	}

	switch (order.status) {
		case "pending":
		case "confirmed":
			return styles.bgLight;
		case "delivered":
			return styles.bgSuccess;
		case "cancelled":
		case "failed":
			return styles.bgError;
		case "refund":
		case "returned":
			return styles.bgWarning;
		case "collected":
		case "delivering":
			return styles.bgSuccessLight;
		default:
			return styles.bgDefault;
	}
};

import styles from "./getStatusColor.module.css";

export const getStatusColor = (status: string) => {
	switch (status) {
		case "pending":
			return styles.pending;
		case "confirmed":
			return styles.confirmed;
		case "delivered":
			return styles.delivered;
		case "cancelled":
			return styles.cancelled;
		default:
			return styles.default;
	}
};

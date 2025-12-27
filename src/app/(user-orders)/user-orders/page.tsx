"use client";

import ErrorComponent from "@/components/ui/ErrorComponent";
import { Loader } from "@/components/ui/Loader";
import { Order } from "@/types/order";
import { useEffect, useState } from "react";
import UserOrdersList from "./_components/UserOrdersList";
import styles from "./page.module.css";

const UserOrdersPage = () => {
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<{
		error: Error;
		userMessage: string;
	} | null>(null);

	useEffect(() => {
		const fetchOrders = async () => {
			try {
				setLoading(true);
				const response = await fetch("/api/orders");

				if (!response.ok) {
					throw new Error("Ошибка при загрузке заказов");
				}

				const data = await response.json();

				if (data.success) {
					setOrders(data.orders || []);
				} else {
					throw new Error(data.message || "Ошибка при загрузке заказов");
				}
			} catch (error) {
				setError({
					error:
						error instanceof Error ? error : new Error("Неизвестная ошибка"),
					userMessage: "Ошибка получения заказов. Попробуйте снова",
				});
			} finally {
				setLoading(false);
			}
		};

		fetchOrders();
	}, []);

	if (loading) return <Loader />;

	if (error)
		return (
			<ErrorComponent error={error.error} userMessage={error.userMessage} />
		);

	if (orders.length === 0) {
		return (
			<div className={styles.container}>
				<h1 className={styles.title}>Заказы</h1>

				<div className={styles.emptyContainer}>
					<div className={styles.emptyIcon}>📦</div>
					<h2 className={styles.emptyTitle}>Заказов пока нет</h2>
					<p className={styles.emptyDescription}>
						Здесь будут отображаться ваши заказы, когда Вы сделаете покупки в
						нашем магазине
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Заказы</h1>
			<UserOrdersList orders={orders} />
		</div>
	);
};

export default UserOrdersPage;

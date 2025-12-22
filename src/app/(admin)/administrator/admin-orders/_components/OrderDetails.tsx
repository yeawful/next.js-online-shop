import { Order } from "@/types/order";
import { Cake } from "lucide-react";
import { isBirthdaySoon } from "../../../../../utils/admin/birthdaySoon";
import { getMappedStatus } from "../utils/getMappedStatus";
import styles from "./OrderDetails.module.css";

interface OrderDetailsProps {
	order: Order;
	totalWeight?: number;
}

const OrderDetails = ({ order, totalWeight = 0 }: OrderDetailsProps) => {
	const formatDate = (isoString: string): string => {
		if (!isoString) return "";

		const date = new Date(isoString);
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear();
		return `${day}.${month}.${year}`;
	};

	const formatDateTime = (isoString: string): string => {
		if (!isoString) return "";

		const date = new Date(isoString);
		const day = date.getDate().toString().padStart(2, "0");
		const month = (date.getMonth() + 1).toString().padStart(2, "0");
		const year = date.getFullYear();
		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");
		return `${day}.${month}.${year}, ${hours}:${minutes}`;
	};

	const formattedCreatedAt = formatDateTime(order.createdAt);
	const formattedDeliveryDate = formatDate(order.deliveryDate);
	const formattedBirthday = formatDate(order.birthday);
	const birthdaySoon = isBirthdaySoon(order.birthday);

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>Детали заказа №{order.orderNumber}</h3>
			<div className={styles.grid}>
				<div className={styles.section}>
					<h4 className={styles.sectionTitle}>Информация о заказе</h4>
					<div className={styles.detailsList}>
						<div className={styles.detailRow}>
							<span className={styles.detailLabel}>Статус:</span>
							<span className={styles.detailValue}>
								{getMappedStatus(order)}
							</span>
						</div>
						<div className={styles.detailRow}>
							<span className={styles.detailLabel}>Способ оплаты:</span>
							<span className={styles.detailValue}>
								{order.paymentMethod === "cash_on_delivery"
									? "Наложенный платёж"
									: order.paymentMethod}
							</span>
						</div>
						<div className={styles.detailRow}>
							<span className={styles.detailLabel}>Статус оплаты:</span>
							<span className={styles.detailValue}>
								{getMappedStatus(order)}
							</span>
						</div>
						<div className={styles.detailRow}>
							<span className={styles.detailLabel}>Создан:</span>
							<span className={styles.detailValue}>{formattedCreatedAt}</span>
						</div>
					</div>
				</div>

				<div className={styles.section}>
					<h4 className={styles.sectionTitle}>Финансовая информация</h4>
					<div className={styles.detailsList}>
						<div className={styles.detailRow}>
							<span className={styles.detailLabel}>Общая сумма:</span>
							<span className={styles.detailValue}>{order.totalAmount} ₽</span>
						</div>
						<div className={styles.detailRow}>
							<span className={styles.detailLabel}>Скидка:</span>
							<span className={styles.discountValue}>
								-{order.discountAmount} ₽
							</span>
						</div>
						<div className={styles.detailRow}>
							<span className={styles.detailLabel}>Использовано бонусов:</span>
							<span className={styles.detailValue}>{order.usedBonuses}</span>
						</div>
						<div className={styles.detailRow}>
							<span className={styles.detailLabel}>Начислено бонусов:</span>
							<span className={styles.discountValue}>
								+{order.earnedBonuses}
							</span>
						</div>
					</div>
				</div>

				<div className={styles.section}>
					<h4 className={styles.sectionTitle}>Информация о доставке</h4>
					<div className={styles.detailsList}>
						<div className={styles.detailRow}>
							<span className={styles.detailLabel}>Город:</span>
							<span className={styles.detailValue}>
								{order.deliveryAddress?.city}
							</span>
						</div>
						<div className={styles.detailRow}>
							<span className={styles.detailLabel}>Адрес:</span>
							<span className={styles.detailValue}>
								ул. {order.deliveryAddress?.street}, д.{" "}
								{order.deliveryAddress?.house}
								{order.deliveryAddress?.apartment &&
									`, кв. ${order.deliveryAddress.apartment}`}
							</span>
						</div>
						{order.deliveryAddress?.additional && (
							<div className={styles.detailRow}>
								<span className={styles.detailLabel}>Дополнительно:</span>
								<span className={styles.detailValue}>
									{order.deliveryAddress?.additional}
								</span>
							</div>
						)}
						<div className={styles.detailRow}>
							<span className={styles.detailLabel}>Дата доставки:</span>
							<span className={styles.detailValue}>
								{formattedDeliveryDate}
							</span>
						</div>
						<div className={styles.detailRow}>
							<span className={styles.detailLabel}>Время доставки:</span>
							<span className={styles.detailValue}>
								{order.deliveryTimeSlot}
							</span>
						</div>
					</div>
				</div>

				{/* Информация о клиенте */}
				<div className={styles.customerSection}>
					<h4 className={styles.sectionTitle}>Информация о клиенте</h4>
					<div className={styles.customerGrid}>
						<div className={styles.customerField}>
							<span className={styles.customerLabel}>Имя:</span>
							<p className={styles.customerValue}>
								{order.name} {order.surname}
							</p>
						</div>
						<div className={styles.customerField}>
							<span className={styles.customerLabel}>Телефон:</span>
							<p className={styles.customerValue}>+{order.phone}</p>
						</div>
						<div className={styles.customerField}>
							<span className={styles.customerLabel}>Пол:</span>
							<p className={styles.customerValue}>
								{order.gender === "male"
									? "Мужской"
									: order.gender === "female"
										? "Женский"
										: order.gender}
							</p>
						</div>
						<div className={styles.customerField}>
							<span className={styles.customerLabel}>Дата рождения:</span>
							<div className={styles.birthdayContainer}>
								<p
									className={`${birthdaySoon ? styles.birthdaySoon : ""} ${styles.customerValue}`}
								>
									{formattedBirthday}
								</p>
								{birthdaySoon && (
									<Cake className="ml-2 text-yellow-500" size={20} />
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.weightSection}>
				<h4 className={styles.weightTitle}>
					<span className={styles.weightText}>
						Общая масса: {totalWeight.toFixed(2)} кг
					</span>
				</h4>
			</div>
		</div>
	);
};

export default OrderDetails;

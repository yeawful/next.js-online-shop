import { Order } from "@/types/order";
import styles from "./CityFilterButtons.module.css";

interface CityFilterButtonsProps {
	cities: string[];
	slotOrders: Order[];
	selectedCity: string;
	onCitySelect: (city: string) => void;
}

const CityFilterButtons = ({
	cities,
	slotOrders,
	selectedCity,
	onCitySelect,
}: CityFilterButtonsProps) => {
	return (
		<div className={styles.container}>
			{cities.map((city) => {
				const ordersCount =
					city === "Все города"
						? slotOrders.length
						: slotOrders.filter((order) => order.deliveryAddress?.city === city)
								.length;

				const isSelected = selectedCity === city;
				const buttonClass = isSelected
					? `${styles.button} ${styles.buttonSelected}`
					: `${styles.button} ${styles.buttonUnselected}`;

				return (
					<button
						key={city}
						onClick={() => onCitySelect(city)}
						className={buttonClass}
					>
						{city}
						<div className={styles.counter}>{ordersCount}</div>
					</button>
				);
			})}
		</div>
	);
};

export default CityFilterButtons;

import { cities } from "@/data/cities";
import { DeliveryAddress as DeliveryAddressType } from "@/types/order";
import styles from "./DeliveryAddress.module.css";

interface DeliveryAddressProps {
	formData: DeliveryAddressType;
	onFormDataChange: (field: keyof DeliveryAddressType, value: string) => void;
}

const DeliveryAddress = ({
	formData,
	onFormDataChange,
}: DeliveryAddressProps) => {
	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Куда</h2>
			<div className={styles.formWrapper}>
				<div className={styles.mainFields}>
					<div className={styles.fieldGroup}>
						<label className={styles.label}>Населенный пункт *</label>
						<select
							value={formData.city}
							onChange={(e) => onFormDataChange("city", e.target.value)}
							className={styles.select}
							required
						>
							{cities.map((city) => (
								<option key={city.value} value={city.value}>
									{city.label}
								</option>
							))}
						</select>
					</div>

					<div className={styles.fieldGroup}>
						<label className={styles.label}>Улица</label>
						<input
							type="text"
							value={formData.street}
							onChange={(e) => onFormDataChange("street", e.target.value)}
							className={styles.input}
							required
						/>
					</div>
				</div>

				<div className={styles.additionalFields}>
					<div className={styles.additionalField}>
						<label className={styles.label}>Дом</label>
						<input
							type="text"
							value={formData.house}
							onChange={(e) => onFormDataChange("house", e.target.value)}
							className={`${styles.input} ${styles.inputSmall}`}
							required
						/>
					</div>

					<div className={styles.additionalField}>
						<label className={styles.label}>Квартира</label>
						<input
							type="text"
							value={formData.apartment}
							onChange={(e) => onFormDataChange("apartment", e.target.value)}
							className={styles.input}
						/>
					</div>

					<div className={styles.additionalField}>
						<label className={styles.label}>Дополнительно</label>
						<input
							value={formData.additional}
							onChange={(e) => onFormDataChange("additional", e.target.value)}
							className={styles.input}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeliveryAddress;

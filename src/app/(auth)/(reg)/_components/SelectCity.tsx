"use client";

import { ChangeEvent } from "react";
import Image from "next/image";
import { cities } from "@/data/cities";
import styles from "./SelectCity.module.css";

interface SelectCityProps {
	value: string;
	onChangeAction: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectCity = ({ value, onChangeAction }: SelectCityProps) => {
	return (
		<div>
			<label htmlFor="location" className={styles.label}>
				Населенный пункт
			</label>
			<div className={styles.selectContainer}>
				<select
					id="location"
					value={value}
					onChange={onChangeAction}
					className={styles.input}
				>
					{cities.map((city) => (
						<option key={city.value}>{city.label}</option>
					))}
				</select>
				<div className={styles.arrowIcon}>
					<Image
						src="/icons-products/icon-arrow-right.svg"
						alt="Выберите населенный пункт"
						width={24}
						height={24}
					/>
				</div>
			</div>
		</div>
	);
};

export default SelectCity;

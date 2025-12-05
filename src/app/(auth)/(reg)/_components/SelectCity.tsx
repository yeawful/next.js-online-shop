"use client";

import { ChangeEvent } from "react";
import Image from "next/image";
import { cities } from "@/data/cities";
import styles from "./SelectCity.module.css";

interface SelectCityProps {
	value: string;
	onChangeAction: (e: ChangeEvent<HTMLSelectElement>) => void;
	className?: string;
	disabled?: boolean;
}

const SelectCity = ({
	value,
	onChangeAction,
	className,
	disabled,
}: SelectCityProps) => {
	return (
		<div>
			<label htmlFor="location" className={styles.label}>
				Населенный пункт
			</label>
			<div className={styles.selectContainer}>
				<select
					id="location"
					name="location"
					value={value}
					disabled={disabled}
					onChange={onChangeAction}
					className={`${styles.input} ${className}`}
				>
					{cities.map((city) => (
						<option key={city.value} value={city.label}>
							{city.label}
						</option>
					))}
				</select>
				{!disabled && (
					<div className={styles.arrowIcon}>
						<Image
							src="/icons-products/icon-arrow-right.svg"
							alt="Выберите населенный пункт"
							width={24}
							height={24}
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default SelectCity;

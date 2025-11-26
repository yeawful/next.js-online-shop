"use client";

import { ChangeEvent } from "react";
import Image from "next/image";
import { regions } from "@/data/regions";
import styles from "./SelectRegion.module.css";

interface SelectRegionProps {
	value: string;
	onChangeAction: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectRegion = ({ value, onChangeAction }: SelectRegionProps) => {
	return (
		<div>
			<label htmlFor="region" className={styles.label}>
				Регион
			</label>
			<div className={styles.selectContainer}>
				<select
					id="region"
					value={value}
					onChange={onChangeAction}
					className={styles.input}
				>
					{regions.map((region) => (
						<option key={region.value}>{region.label}</option>
					))}
				</select>
				<div className={styles.arrowIcon}>
					<Image
						src="/icons-products/icon-arrow-right.svg"
						alt="Выберите регион"
						width={24}
						height={24}
					/>
				</div>
			</div>
		</div>
	);
};

export default SelectRegion;

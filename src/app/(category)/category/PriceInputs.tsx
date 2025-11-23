import Image from "next/image";
import { PriceInputsProps } from "@/types/priceInputsProps";
import styles from "./PriceInputs.module.css";

const PriceInputs = ({
	from,
	to,
	min,
	max,
	onFromChangeAction,
	onToChangeAction,
}: PriceInputsProps) => {
	return (
		<div className={styles.priceInputs}>
			<input
				type="number"
				name="from"
				value={from}
				onChange={(e) => onFromChangeAction(e.target.value)}
				placeholder={`${min}`}
				min={min}
				max={max}
				className={styles.priceInput}
			/>
			<Image
				src="/icons-products/icon-line.svg"
				alt="до"
				width={24}
				height={24}
			/>
			<input
				type="number"
				name="to"
				value={to}
				onChange={(e) => onToChangeAction(e.target.value)}
				placeholder={`${max}`}
				min={min}
				max={max}
				className={styles.priceInput}
			/>
		</div>
	);
};

export default PriceInputs;

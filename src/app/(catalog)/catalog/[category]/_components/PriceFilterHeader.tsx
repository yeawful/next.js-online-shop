"use client";

import styles from "./PriceFilterHeader.module.css";

interface PriceFilterHeaderProps {
	onResetAction: () => void;
}

const PriceFilterHeader = ({ onResetAction }: PriceFilterHeaderProps) => {
	return (
		<div className={styles.priceFilterHeader}>
			<p className={styles.priceTitle}>Цена</p>
			<button
				type="button"
				onClick={onResetAction}
				className={styles.clearButton}
			>
				Очистить
			</button>
		</div>
	);
};

export default PriceFilterHeader;

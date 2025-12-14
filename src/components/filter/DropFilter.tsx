"use client";

import Image from "next/image";
import { useState } from "react";
import FilterButtons from "./FilterButtons";
import FilterControls from "./FilterControls";
import PriceFilter from "./PriceFilter";
import styles from "./DropFilter.module.css";

const DropFilter = ({
	basePath,
	category,
	apiEndpoint = "/category",
	userId,
}: {
	basePath: string;
	category: string;
	apiEndpoint: string;
	userId: string;
}) => {
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	return (
		<div className={styles.dropFilter}>
			<button
				onClick={() => setIsFilterOpen(true)}
				className={styles.filterButton}
			>
				Фильтр
			</button>
			<div
				className={`${styles.filterOverlay} ${
					isFilterOpen ? styles.filterOverlayOpen : styles.filterOverlayClosed
				}`}
			>
				<div className={styles.filterHeader}>
					<h3 className={styles.filterTitle}>Фильтр</h3>
					<button
						onClick={() => setIsFilterOpen(false)}
						className={styles.closeButton}
					>
						<Image
							src="/icons-products/icon-closer.svg"
							alt="Закрыть фильтры"
							width={24}
							height={24}
						/>
					</button>
				</div>
				<FilterButtons basePath={basePath} />
				<FilterControls basePath={basePath} />
				<PriceFilter
					basePath={basePath}
					category={category}
					setIsFilterOpenAction={setIsFilterOpen}
					apiEndpoint={apiEndpoint}
					userId={userId}
				/>
			</div>
		</div>
	);
};

export default DropFilter;

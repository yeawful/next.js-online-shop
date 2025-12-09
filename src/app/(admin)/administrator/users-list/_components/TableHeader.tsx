"use client";

import { ChevronUp, ChevronDown } from "lucide-react";
import { columns } from "@/data/columnsUsersList";
import styles from "./TableHeader.module.css";

interface TableHeaderProps {
	sortBy: string;
	sortDirection: "asc" | "desc";
	onSort: (field: string, direction: "asc" | "desc") => void;
}

const TableHeader = ({ sortBy, sortDirection, onSort }: TableHeaderProps) => {
	const handleIconClick = (
		e: React.MouseEvent,
		field: string,
		direction: "asc" | "desc"
	) => {
		e.stopPropagation();
		onSort(field, direction);
	};

	return (
		<div className={styles.container}>
			{columns.map(({ key, label, span, sortable }) => {
				const isActiveSort = sortBy === key;

				return (
					<div
						key={key}
						className={`${span} ${styles.column} ${
							sortable ? styles.sortable : styles.notSortable
						}`}
					>
						<div className={styles.labelContainer}>
							{label}
							{sortable && (
								<div className={styles.sortIconsContainer}>
									<ChevronUp
										className={`${styles.icon} ${styles.iconUp} ${
											isActiveSort && sortDirection === "asc"
												? styles.iconActive
												: styles.iconInactive
										}`}
										onClick={(e) => handleIconClick(e, key, "asc")}
									/>
									<ChevronDown
										className={`${styles.icon} ${styles.iconDown} ${
											isActiveSort && sortDirection === "desc"
												? styles.iconActive
												: styles.iconInactive
										}`}
										onClick={(e) => handleIconClick(e, key, "desc")}
									/>
								</div>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default TableHeader;

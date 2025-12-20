import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { CUSTOMER_STATUSES } from "../utils/customerStatuses";
import { getStatusColorClass } from "../utils/getStatusColorClass";
import styles from "./StatusDropdown.module.css";

interface StatusDropdownProps {
	currentStatusLabel: string;
	isUpdating: boolean;
	onStatusChange: (newStatusLabel: string) => void;
}

const StatusDropdown = ({
	currentStatusLabel,
	isUpdating,
	onStatusChange,
}: StatusDropdownProps) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsDropdownOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const currentStatusData = CUSTOMER_STATUSES.find(
		(status) => status.label === currentStatusLabel
	);

	const isLightStatus =
		currentStatusLabel === "Доставляется" || currentStatusLabel === "Новый";

	return (
		<div className={styles.dropdownContainer} ref={dropdownRef}>
			<button
				type="button"
				onClick={() => !isUpdating && setIsDropdownOpen(!isDropdownOpen)}
				disabled={isUpdating}
				className={`${styles.dropdownButton} ${getStatusColorClass(
					currentStatusLabel,
					true
				)} ${isUpdating ? styles.buttonDisabled : ""}`}
			>
				<div className={styles.buttonContent}>
					{currentStatusData && (
						<Image
							src={currentStatusData.icon}
							alt={currentStatusData.label}
							width={24}
							height={24}
							className={`${styles.statusIcon} ${isLightStatus ? "" : styles.statusIconFiltered}`}
						/>
					)}
					<span
						className={`${styles.statusText} ${isLightStatus ? styles.statusTextGray : styles.statusTextLight}`}
					>
						{currentStatusLabel}
					</span>
				</div>
				<Image
					src="/icons-header/icon-arrow.svg"
					alt="Раскрыть"
					width={24}
					height={24}
					className={`${styles.arrowIcon} ${isLightStatus ? "" : styles.arrowFiltered} ${isDropdownOpen ? styles.arrowRotated : ""}`}
				/>
			</button>

			{isDropdownOpen && (
				<div className={styles.dropdownMenu}>
					{CUSTOMER_STATUSES.map((status) => (
						<button
							key={status.value}
							type="button"
							onClick={() => {
								onStatusChange(status.label);
								setIsDropdownOpen(false);
							}}
							className={`${styles.dropdownItem} ${getStatusColorClass(
								status.label,
								false
							)}`}
						>
							<Image
								src={status.icon}
								alt={status.label}
								width={24}
								height={24}
								className={styles.dropdownItemIcon}
							/>
							<span>{status.label}</span>
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default StatusDropdown;

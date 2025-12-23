import { MenuOverlayProps } from "../types/sidebar";
import styles from "./MenuOverlay.module.css";

export const MenuOverlay = ({ isOpen, onClose }: MenuOverlayProps) => {
	const overlayClass = isOpen
		? `${styles.overlay} ${styles.overlayOpen}`
		: `${styles.overlay} ${styles.overlayClosed}`;

	return (
		<div className={overlayClass} onClick={onClose}>
			{isOpen && (
				<>
					<div className={styles.pulseCircleBlue} />
					<div className={styles.pulseCirclePurple} />
				</>
			)}
		</div>
	);
};

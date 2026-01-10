import { SidebarOverlayProps } from "../types/sidebar.types";
import styles from "./SidebarOverlay.module.css";
import animations from "./animations.module.css";

export default function SidebarOverlay({
	isOpen,
	onClose,
}: SidebarOverlayProps) {
	if (!isOpen) return null;

	return (
		<div
			className={`${styles.overlay} ${animations.fadeIn}`}
			onClick={onClose}
		/>
	);
}

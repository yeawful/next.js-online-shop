import { Menu } from "lucide-react";
import { FloatingMenuButtonProps } from "../types/sidebar.types";
import styles from "./FloatingMenuButton.module.css";
import animations from "./animations.module.css";

export default function FloatingMenuButton({
	onClick,
	categoriesCount,
}: FloatingMenuButtonProps) {
	return (
		<button
			onClick={onClick}
			className={`${styles.floatingButton} ${animations.floatAnimation}`}
			aria-label="Открыть меню категорий"
		>
			<Menu className={`${styles.icon}`} />
			<span className={`${styles.badge} ${styles.pulseAnimation}`}>
				{categoriesCount}
			</span>
		</button>
	);
}

import { X } from "lucide-react";
import { MenuHeaderProps } from "../types/sidebar";
import styles from "./MenuHeader.module.css";

export const MenuHeader = ({ onCloseAction, icon }: MenuHeaderProps) => {
	return (
		<div className={styles.container}>
			<div className={styles.logoContainer}>
				<div className={styles.iconWrapper}>
					<div className={styles.iconGlow} />
					{icon}
				</div>
				<h2 className={styles.title}>Быстрые действия</h2>
			</div>

			<button
				onClick={onCloseAction}
				className={styles.closeButton}
				aria-label="Закрыть меню"
			>
				<X className={styles.closeIcon} />
			</button>
		</div>
	);
};

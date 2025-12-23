import IconArrowAnim from "./IconArrowAnim";
import { MenuItemsListProps } from "../types/sidebar";
import styles from "./MenuItemsList.module.css";

export const MenuItemsList = ({ items, onItemClick }: MenuItemsListProps) => {
	return (
		<div className={styles.container}>
			{items.map((item, index) => (
				<button
					key={item.id}
					onClick={() => onItemClick(item.path)}
					className={`${styles.menuItem} ${styles.animateSlideIn}`}
					style={{
						background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
						animationDelay: `${index * 100}ms`,
					}}
				>
					<div className={styles.iconContainer}>
						<div className={styles.iconBackground} />
						<div className={styles.iconWrapper}>
							<div
								className={styles.iconGlow}
								style={{ background: `linear-gradient(135deg, ${item.color})` }}
							/>
							<div className={styles.icon}>{item.icon}</div>
						</div>
					</div>

					<div className={styles.content}>
						<div className={styles.title}>{item.title}</div>
						<div className={styles.description}>{item.description}</div>
					</div>

					<IconArrowAnim />
				</button>
			))}
		</div>
	);
};

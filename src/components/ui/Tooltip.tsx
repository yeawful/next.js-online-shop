import Image from "next/image";
import styles from "./Tooltip.module.css";

type TooltipProps = {
	text: string;
	position?: "top" | "bottom";
	cardPosition?: boolean;
};

const Tooltip = ({
	text,
	position = "bottom",
	cardPosition = false,
}: TooltipProps) => {
	const containerClass =
		position === "top"
			? cardPosition
				? `${styles.container} ${styles.containerTopCard}`
				: `${styles.container} ${styles.containerTop}`
			: `${styles.container} ${styles.containerBottom}`;

	return (
		<div className={containerClass}>
			<div className={styles.tooltip}>
				<Image
					src="/icons-auth/icon-attention.svg"
					alt={text}
					width={21}
					height={21}
					className={position === "bottom" ? styles.icon : styles.iconTop}
				/>
				{position === "top" ? (
					<div className={styles.arrowTop}></div>
				) : (
					<div className={styles.arrowBottom}></div>
				)}
				{text}
			</div>
		</div>
	);
};

export default Tooltip;

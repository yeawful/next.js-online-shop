import Image from "next/image";
import styles from "./Tooltip.module.css";

type TooltipProps = {
	text: string;
	position?: "top" | "bottom";
};

const Tooltip = ({ text, position = "bottom" }: TooltipProps) => {
	return (
		<div
			className={
				position === "top"
					? styles.tooltipContainerTop
					: styles.tooltipContainer
			}
		>
			<div
				className={
					position === "bottom" ? styles.tooltipBottom : styles.tooltipTop
				}
			>
				<Image
					src="/icons-auth/icon-attention.svg"
					alt={text}
					width={21}
					height={21}
					className={position === "bottom" ? styles.iconBottom : styles.iconTop}
				/>

				{position === "top" ? (
					<div className={styles.triangleTop}></div>
				) : (
					<div className={styles.triangleBottom}></div>
				)}

				{text}
			</div>
		</div>
	);
};

export default Tooltip;

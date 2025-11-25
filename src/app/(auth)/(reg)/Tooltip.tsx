import Image from "next/image";
import styles from "./Tooltip.module.css";

const Tooltip = ({ text }: { text: string }) => {
	return (
		<div className={styles.tooltip}>
			<div className={styles.tooltipContent}>
				<Image
					src="/icons-auth/icon-attention.svg"
					alt={text}
					width={21}
					height={21}
					className={styles.tooltipIcon}
				/>
				<div className={styles.tooltipArrow}></div>
				{text}
			</div>
		</div>
	);
};

export default Tooltip;

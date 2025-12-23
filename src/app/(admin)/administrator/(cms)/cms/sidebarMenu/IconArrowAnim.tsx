import styles from "./IconArrowAnim.module.css";

export const IconArrowAnim = () => {
	return (
		<div className={styles.container}>
			<svg
				className={styles.arrowIcon}
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9 5l7 7-7 7"
				/>
			</svg>
		</div>
	);
};

export default IconArrowAnim;

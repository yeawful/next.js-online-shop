import styles from "./DeliveryTimeSkeletons.module.css";

const DeliveryTimeSkeletons = () => {
	return (
		<div className={styles.container}>
			<div className={styles.titleSkeleton}></div>

			<div className={styles.contentWrapper}>
				<div className={styles.inputGroup}>
					<div className={styles.labelSkeleton}></div>
					<div className={styles.inputSkeleton}></div>
				</div>

				<div className={styles.timeSlotsWrapper}>
					<div className={styles.labelSkeleton}></div>
					<div className={styles.timeSlotsGrid}>
						{[1, 2, 3, 4, 5, 6].map((i) => (
							<div
								key={i}
								className={styles.timeSlotSkeleton}
								style={{
									animationDelay: `${i * 100}ms`,
								}}
							></div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeliveryTimeSkeletons;

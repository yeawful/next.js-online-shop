import styles from "./CartSkeletons.module.css";

const CartSkeletons = () => {
	return (
		<div className={styles.container}>
			<div className={styles.checkbox}></div>

			<div className={styles.contentWrapper}>
				<div className={styles.productSection}>
					<div className={styles.image}></div>

					<div className={styles.details}>
						<div className={styles.title}></div>

						<div className={styles.infoRow}>
							<div className={styles.brand}></div>
							<div className={styles.rating}></div>
						</div>

						<div className={styles.weight}></div>
					</div>
				</div>

				<div className={styles.controlsSection}>
					<div className={styles.quantitySelector}>
						<div className={styles.quantityButton}></div>
						<div className={styles.quantityDisplay}></div>
						<div className={styles.quantityButton}></div>
					</div>

					<div className={styles.price}></div>
				</div>
			</div>
		</div>
	);
};

export default CartSkeletons;

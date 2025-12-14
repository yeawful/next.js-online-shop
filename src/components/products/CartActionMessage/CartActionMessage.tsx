"use client";

import styles from "./CartActionMessage.module.css";

interface CartActionMessageProps {
	message: {
		success: boolean;
		message: string;
	};
	onClose: () => void;
}

const CartActionMessage = ({ message, onClose }: CartActionMessageProps) => {
	const containerClass = `${styles.container} ${
		message.success ? styles.containerSuccess : styles.containerError
	}`;

	return (
		<div className={containerClass}>
			<div className={styles.content}>
				<p className={styles.message}>{message.message}</p>
				<button
					onClick={onClose}
					className={styles.closeButton}
					aria-label="Закрыть"
				>
					×
				</button>
			</div>
		</div>
	);
};

export default CartActionMessage;

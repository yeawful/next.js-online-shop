import CloseButton from "./CloseButton";
import styles from "./AuthFormLayout.module.css";

type AuthFormVariant = "register" | "default";

export const AuthFormLayout = ({
	children,
	variant = "default",
}: {
	children: React.ReactNode;
	variant?: AuthFormVariant;
}) => {
	const containerClass = `${styles.authContainer} ${
		variant === "register"
			? styles.authContainerRegister
			: styles.authContainerDefault
	}`;

	return (
		<div className={styles.authOverlay}>
			<div className={containerClass}>
				<CloseButton />
				<div className={styles.authContent}>{children}</div>
			</div>
		</div>
	);
};

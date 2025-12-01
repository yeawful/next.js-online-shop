"use client";

import { RotateCw, XCircle } from "lucide-react";
import { ReactNode } from "react";
import styles from "./ErrorContent.module.css";

type ErrorContentProps = {
	error: string | null;
	icon?: ReactNode;
	title?: string;
	primaryAction?: {
		label: string;
		onClick: () => void;
		className?: string;
	};
	secondaryAction?: {
		label: string | React.ReactNode;
		onClick: () => void;
		className?: string;
	};
};

export const ErrorContent = ({
	error,
	icon = <XCircle className={styles.buttonIcon} style={{ color: "#dc2626" }} />,
	title = "Ошибка отправки",
	primaryAction,
	secondaryAction,
}: ErrorContentProps) => {
	return (
		<div className={styles.errorContainer}>
			<div className={styles.errorHeader}>
				<div className={styles.errorIcon}>{icon}</div>
				<div className="space-y-2">
					<h3 className={styles.errorTitle}>{title}</h3>
					{error && <p className={styles.errorMessage}>{error}</p>}
				</div>
			</div>

			<div className={styles.actionsContainer}>
				{primaryAction && (
					<button
						onClick={primaryAction.onClick}
						className={`${styles.primaryButton} ${
							primaryAction.className || ""
						}`}
					>
						<span>{primaryAction.label}</span>
					</button>
				)}

				{secondaryAction && (
					<button
						onClick={secondaryAction.onClick}
						className={`${styles.secondaryButton} ${secondaryAction.className}`}
					>
						<RotateCw className={styles.buttonIcon} />
						<span>{secondaryAction.label}</span>
					</button>
				)}
			</div>
		</div>
	);
};

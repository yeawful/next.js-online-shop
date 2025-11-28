"use client";

import { useRegFormContext } from "@/app/contexts/RegFormContext";
import { Smartphone, Mail } from "lucide-react";
import { AuthFormLayout } from "../../_components/AuthFormLayout";
import Link from "next/link";
import styles from "./VerificationMethodModal.module.css";

export default function VerificationMethodModal() {
	const { regFormData } = useRegFormContext();
	const { phoneNumber, email } = regFormData;

	return (
		<AuthFormLayout>
			<div className={styles.modalContainer}>
				<div className={styles.contentContainer}>
					<div className={styles.header}>
						<h2 className={styles.title}>Подтверждение аккаунта</h2>
						<p className={styles.subtitle}>
							Выберите удобный способ подтверждения для завершения регистрации
						</p>
					</div>

					<div className={styles.verificationOptions}>
						<Link
							href="/verify/verify-phone"
							className={styles.verificationLink}
						>
							<div className={styles.iconContainer}>
								<Smartphone className={styles.icon} />
							</div>
							<span className={styles.linkTitle}>По SMS на телефон</span>
							<span className={styles.linkSubtitle}>+{phoneNumber}</span>
							<div className={styles.pingIndicator}>
								<span className={styles.pingCircle}>
									<span className={styles.pingAnimation}></span>
									<span className={styles.pingDot}></span>
								</span>
							</div>
						</Link>

						<div className={styles.divider}>
							<div className={styles.dividerLine}></div>
							<span className={styles.dividerText}>или</span>
							<div className={styles.dividerLine}></div>
						</div>

						<Link
							href="/verify/verify-email"
							className={styles.verificationLink}
						>
							<div className={styles.iconContainer}>
								<Mail className={styles.icon} />
							</div>
							<span className={styles.linkTitle}>По ссылке на email</span>
							<span className={styles.linkSubtitle}>{email}</span>
						</Link>
					</div>
				</div>
			</div>
		</AuthFormLayout>
	);
}

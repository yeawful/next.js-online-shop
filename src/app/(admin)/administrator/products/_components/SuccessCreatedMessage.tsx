import { useRouter } from "next/navigation";
import styles from "./SuccessCreatedMessage.module.css";

interface SuccessCreatedMessageProps {
	createdProductId: number;
	categories: string[];
	onClearForm: () => void;
}

const SuccessCreatedMessage = ({
	createdProductId,
	categories,
	onClearForm,
}: SuccessCreatedMessageProps) => {
	const router = useRouter();
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div>
					<p className={styles.message}>Товар успешно создан!</p>
				</div>
				<div className={styles.buttons}>
					<button
						onClick={() =>
							router.push(`/catalog/${categories[0]}/${createdProductId}`)
						}
						className={styles.primaryButton}
					>
						Перейти к товару
					</button>
					<button onClick={onClearForm} className={styles.secondaryButton}>
						Добавить еще
					</button>
				</div>
			</div>
		</div>
	);
};

export default SuccessCreatedMessage;

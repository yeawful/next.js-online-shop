import { Plus } from "lucide-react";
import { HeaderActionsProps } from "../../types";
import styles from "./HeaderActions.module.css";

export function HeaderActions({ onCreate }: HeaderActionsProps) {
	return (
		<div className={styles.container}>
			<div className="flex gap-2">
				<button onClick={onCreate} className={styles.createButton}>
					<Plus className={styles.buttonIcon} />
					Новая категория
				</button>
			</div>
		</div>
	);
}

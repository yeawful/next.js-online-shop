import { AlertTriangle } from "lucide-react";
import styles from "./Tags.module.css";

interface TagsProps {
	selectedTags: string[];
	onTagsChange: (tags: string[]) => void;
	hasActionsTag: boolean;
}

const Tags = ({ selectedTags, onTagsChange, hasActionsTag }: TagsProps) => {
	const availableTags = [
		{ value: "actions", label: "Акции" },
		{ value: "new", label: "Новинки" },
	];

	const handleTagChange = (tagValue: string, isChecked: boolean) => {
		const newTags = isChecked
			? [...selectedTags, tagValue]
			: selectedTags.filter((tag) => tag !== tagValue);

		onTagsChange(newTags);
	};

	return (
		<div className={styles.container}>
			<label className={styles.label}>Теги</label>
			<div className={styles.tagsGrid}>
				{availableTags.map((tag) => {
					const checked = selectedTags.includes(tag.value);
					return (
						<label key={tag.value} className={styles.tagLabel}>
							<div className={styles.checkboxContainer}>
								<input
									type="checkbox"
									checked={checked}
									onChange={(e) => handleTagChange(tag.value, e.target.checked)}
									className={styles.hiddenCheckbox}
								/>
								<div
									className={`${styles.customCheckbox} ${
										checked ? styles.customCheckboxChecked : ""
									}`}
								>
									{checked && (
										<svg
											className={styles.checkmark}
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={3}
												d="M5 13l4 4L19 7"
											/>
										</svg>
									)}
								</div>
							</div>
							<span className={styles.tagText}>{tag.label}</span>
						</label>
					);
				})}
			</div>
			{hasActionsTag && (
				<div className={styles.warning}>
					<div className={styles.warningContent}>
						<AlertTriangle className={styles.warningIcon} />
						<span className={styles.warningText}>
							Для товара с тегом &quot;Акции&quot; обязательно укажите скидку
						</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default Tags;

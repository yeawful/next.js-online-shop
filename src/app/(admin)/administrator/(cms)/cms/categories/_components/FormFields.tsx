/* eslint-disable @typescript-eslint/no-explicit-any */
import { RotateCcw } from "lucide-react";
import { SEO_LIMITS } from "../../utils/SEO_LIMITS";
import styles from "./FormFields.module.css";

interface FormFieldsProps {
	formData: any;
	errors: any;
	charCount: any;
	onInputChange: (field: string, value: string, maxLength: number) => void;
	onGenerateSlug: () => void;
}

export const FormFields = ({
	formData,
	errors,
	charCount,
	onInputChange,
	onGenerateSlug,
}: FormFieldsProps) => {
	const getCharCounterClass = (current: number, max: number) => {
		if (current > max) return styles.charCounterError;
		return styles.charCounterNormal;
	};

	const getDescriptionCharCounterClass = (
		current: number,
		max: number,
		min: number
	) => {
		if (current > max) return styles.charCounterError;
		if (current < min && current > 0) return styles.charCounterWarning;
		return styles.charCounterNormal;
	};

	return (
		<div className={styles.grid}>
			<div className={styles.fieldContainer}>
				<div className={styles.fieldHeader}>
					<label className={styles.label}>Название категории *</label>
					<span
						className={`${styles.charCounter} ${getCharCounterClass(charCount.name, SEO_LIMITS.name.max)}`}
					>
						{charCount.name}/{SEO_LIMITS.name.max}
					</span>
				</div>
				<input
					type="text"
					value={formData.name}
					onChange={(e) =>
						onInputChange("name", e.target.value, SEO_LIMITS.name.max)
					}
					required
					className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
					placeholder="Например: Соки"
				/>
				{errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
			</div>

			<div className={styles.fieldContainer}>
				<div className={styles.fieldHeader}>
					<label className={styles.label}>Алиас (slug) *</label>
					<span
						className={`${styles.charCounter} ${getCharCounterClass(charCount.slug, SEO_LIMITS.slug.max)}`}
					>
						{charCount.slug}/{SEO_LIMITS.slug.max}
					</span>
				</div>
				<div className={styles.slugContainer}>
					<input
						type="text"
						value={formData.slug}
						onChange={(e) => {
							const value = e.target.value.toLowerCase();
							const cleaned = value
								.replace(/\s+/g, "-")
								.replace(/[^a-z0-9-]/g, "");

							onInputChange("slug", cleaned, SEO_LIMITS.slug.max);
						}}
						required
						className={`${styles.input} ${styles.slugInput} ${errors.slug ? styles.inputError : ""}`}
						placeholder="soki"
					/>
					<button
						type="button"
						onClick={onGenerateSlug}
						className={styles.generateButton}
						title="Сгенерировать из названия"
					>
						<RotateCcw className={styles.generateIcon} />
						Генерировать
					</button>
				</div>
				{errors.slug ? (
					<p className={styles.errorMessage}>{errors.slug}</p>
				) : (
					<p className={styles.hint}>Только латиница, цифры и дефисы</p>
				)}
			</div>

			<div className={`${styles.fieldContainer} ${styles.fullWidth}`}>
				<div className={styles.fieldHeader}>
					<label className={styles.label}>Описание (мета-описание)</label>
					<span
						className={`${styles.charCounter} ${getDescriptionCharCounterClass(charCount.description, SEO_LIMITS.description.max, SEO_LIMITS.description.min)}`}
					>
						{charCount.description}/{SEO_LIMITS.description.max}
					</span>
				</div>
				<textarea
					value={formData.description}
					onChange={(e) =>
						onInputChange(
							"description",
							e.target.value,
							SEO_LIMITS.description.max
						)
					}
					rows={3}
					className={`${styles.textarea} ${errors.description ? styles.inputError : ""}`}
					placeholder="Краткое описание категории для поисковых систем (10-160 символов)"
				/>
				{errors.description ? (
					<p className={styles.errorMessage}>{errors.description}</p>
				) : (
					<p className={styles.hint}>
						Оптимальная длина для SEO: {SEO_LIMITS.description.min}-
						{SEO_LIMITS.description.max} символов
					</p>
				)}
			</div>

			<div className={`${styles.fieldContainer} ${styles.fullWidth}`}>
				<div className={styles.fieldHeader}>
					<label className={styles.label}>
						Ключевые слова
						<span className={styles.commaHint}>(через запятую)</span>
					</label>
					<span
						className={`${styles.charCounter} ${getCharCounterClass(charCount.keywords, SEO_LIMITS.keywords.maxLength)}`}
					>
						{charCount.keywords}/{SEO_LIMITS.keywords.maxLength}
					</span>
				</div>
				<input
					type="text"
					value={formData.keywords}
					onChange={(e) =>
						onInputChange(
							"keywords",
							e.target.value,
							SEO_LIMITS.keywords.maxLength
						)
					}
					className={`${styles.input} ${errors.keywords ? styles.inputError : ""}`}
					placeholder="мясо, напитки, польза и вред"
				/>
				{errors.keywords && (
					<p className={styles.errorMessage}>{errors.keywords}</p>
				)}
			</div>
		</div>
	);
};

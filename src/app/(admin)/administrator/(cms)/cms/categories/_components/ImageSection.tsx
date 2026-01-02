import Image from "next/image";
import { AlertCircle, Upload, XCircle } from "lucide-react";
import { SEO_LIMITS } from "../../utils/SEO_LIMITS";
import { useRef } from "react";
import { useCategoryStore } from "@/store/categoryStore";
import { ImageSectionProps } from "../../types";
import styles from "./ImageSection.module.css";

export const ImageSection = ({
	errors,
	charCount,
	onInputChange,
	onFileChange,
	onRemoveImage,
}: ImageSectionProps) => {
	const { editingId, isUploading, isSubmitting, formData } = useCategoryStore();
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleRemoveImage = () => {
		onRemoveImage();

		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const getCharCounterClass = (current: number, max: number) => {
		if (current > max) return styles.altTextCounterError;
		return styles.altTextCounterNormal;
	};

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>Изображение категории</h3>
			<div className={styles.content}>
				{formData.image && (
					<div className={styles.imagePreview}>
						<div className={styles.previewContainer}>
							<div className="shrink-0">
								<Image
									src={formData.image}
									alt="Предпросмотр"
									width={160}
									height={160}
									className={styles.previewImage}
									unoptimized={formData.image.startsWith("blob:")}
								/>
							</div>
							<div className={styles.previewInfo}>
								<p className={styles.previewText}>
									{formData.image.startsWith("blob:")
										? "Новое изображение (будет загружено при сохранении)"
										: "Текущее изображение категории"}
								</p>
								{formData.image.startsWith("blob:") && (
									<p className={styles.alertMessage}>
										<AlertCircle className={styles.alertIcon} />
										Старое изображение будет удалено после сохранения
									</p>
								)}
								<button
									type="button"
									onClick={handleRemoveImage}
									disabled={isUploading || isSubmitting}
									className={styles.removeButton}
								>
									<XCircle className={styles.removeIcon} />
									Удалить изображение
								</button>
							</div>
						</div>
					</div>
				)}
				<div>
					<label className={styles.uploadLabel}>
						{formData.image ? "Заменить изображение" : "Загрузить изображение"}
						<span className={styles.hint}>
							(рекомендуется 800×450px, максимум 5MB)
						</span>
					</label>
					<div className={styles.uploadContainer}>
						<div className={styles.fileInputWrapper}>
							<label className={styles.fileInputLabel}>
								<input
									type="file"
									ref={fileInputRef}
									accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
									onChange={onFileChange}
									disabled={isUploading || isSubmitting}
									className={styles.fileInput}
								/>
								<div className={styles.fileInputContent}>
									<Upload className={styles.uploadIcon} />
									<span>Выберите файл</span>
								</div>
							</label>
						</div>
						{isUploading && (
							<div className={styles.uploadingIndicator}>
								<div className={styles.uploadingSpinner}></div>
								Обработка...
							</div>
						)}
					</div>
					<p className={styles.formatHint}>
						Поддерживаемые форматы: JPG, PNG, GIF, WebP. Изображение будет
						загружено на сервер только при сохранении категории.
						{editingId &&
							formData.image &&
							formData.image.startsWith("blob:") && (
								<span className={styles.warningMessage}>
									<AlertCircle className={styles.warningIcon} />
									При сохранении старое изображение будет удалено
								</span>
							)}
					</p>
				</div>
				{formData.image && (
					<div className={styles.altTextContainer}>
						<div className={styles.altTextHeader}>
							<label className={styles.altTextLabel}>
								Описание изображения (ALT текст)
							</label>
							<span
								className={`${styles.altTextCounter} ${getCharCounterClass(charCount.imageAlt, SEO_LIMITS.imageAlt.max)}`}
							>
								{charCount.imageAlt}/{SEO_LIMITS.imageAlt.max}
							</span>
						</div>
						<input
							type="text"
							value={formData.imageAlt || ""}
							onChange={(e) =>
								onInputChange(
									"imageAlt",
									e.target.value,
									SEO_LIMITS.imageAlt.max
								)
							}
							disabled={isSubmitting}
							className={`${styles.altTextInput} ${
								errors.imageAlt ? styles.altTextInputError : ""
							}`}
							placeholder="Например: Соки и напитки в ассортименте"
						/>
					</div>
				)}
			</div>
		</div>
	);
};

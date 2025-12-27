/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { AlertCircle, Upload, XCircle } from "lucide-react";
import { SEO_LIMITS } from "../../utils/SEO_LIMITS";
import { useRef } from "react";
import styles from "./ImageSection.module.css";

interface ImageSectionProps {
	errors: any;
	formData: any;
	charCount: any;
	isUploading: boolean;
	isSubmitting: boolean;
	onInputChange: (field: string, value: string, maxLength: number) => void;
	onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onRemoveImage: () => void;
}

const ImageSection = ({
	errors,
	formData,
	charCount,
	isUploading,
	isSubmitting,
	onInputChange,
	onFileChange,
	onRemoveImage,
}: ImageSectionProps) => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleRemoveImage = () => {
		onRemoveImage();

		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
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
									width={800}
									height={450}
									className={styles.previewImage}
									unoptimized={formData.image.startsWith("blob:")}
								/>
							</div>
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
				)}
				<div>
					<label className={styles.uploadLabel}>
						{"Загрузить изображение"}
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
					</p>
				</div>
				{formData.image && (
					<div className={styles.altTextContainer}>
						<div className={styles.altTextHeader}>
							<label className={styles.altTextLabel}>
								Описание изображения (ALT текст)
							</label>
							<span
								className={`${styles.altTextCounter} ${
									charCount.imageAlt > SEO_LIMITS.imageAlt.max
										? styles.altTextCounterError
										: styles.altTextCounterNormal
								}`}
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

export default ImageSection;

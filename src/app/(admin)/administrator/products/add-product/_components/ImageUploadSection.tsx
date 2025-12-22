import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import ImageUploader from "./ImageUploader";
import styles from "./ImageUploadSection.module.css";

interface ImageUploadSectionProps {
	onImageChange: (file: File | null) => void;
	uploading: boolean;
	loading: boolean;
	existingImage?: string;
}

const ImageUploadSection = ({
	onImageChange,
	uploading,
	loading,
	existingImage,
}: ImageUploadSectionProps) => {
	const [image, setImage] = useState<File | null>(null);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);

	useEffect(() => {
		if (existingImage) {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setPreviewUrl(existingImage);
		}
	}, [existingImage]);

	const handleImageUpload = (file: File) => {
		setImage(file);
		onImageChange(file);

		const url = URL.createObjectURL(file);
		setPreviewUrl(url);
	};

	const handleRemoveImage = () => {
		setImage(null);
		onImageChange(null);

		if (previewUrl && previewUrl.startsWith("blob:")) {
			URL.revokeObjectURL(previewUrl);
		}
		setPreviewUrl(null);
	};

	return (
		<div className={styles.container}>
			<label className={styles.label}>
				Изображение товара <span className={styles.required}>*</span>
			</label>

			{previewUrl ? (
				<div className={styles.previewContainer}>
					<div className={styles.imageWrapper}>
						<Image
							src={previewUrl}
							alt="Предпросмотр товара"
							fill
							className={styles.image}
						/>
						<button
							type="button"
							onClick={handleRemoveImage}
							className={styles.removeButton}
							disabled={uploading || loading}
						>
							<X className={styles.removeIcon} />
						</button>
					</div>
					<p className={styles.fileInfo}>
						{image ? (
							<>
								Выбрано: {image?.name} (
								{(image ? image.size / 1024 / 1024 : 0).toFixed(2)} MB)
							</>
						) : (
							"Существующее изображение"
						)}
					</p>
				</div>
			) : (
				<ImageUploader onImageUploadAction={handleImageUpload} />
			)}

			{uploading && (
				<p className={styles.uploadingText}>Загрузка изображения...</p>
			)}
		</div>
	);
};

export default ImageUploadSection;

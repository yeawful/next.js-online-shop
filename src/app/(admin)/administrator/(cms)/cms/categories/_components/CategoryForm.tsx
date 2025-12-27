/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FormFields } from "./FormFields";
import ImageSection from "./ImageSection";
import SubmitSection from "./SubmitSection";
import styles from "./CategoryForm.module.css";

interface CategoryFormProps {
	formData: any;
	errors: any;
	isSubmitting: boolean;
	onFieldChange: (field: string, value: string) => void;
	onGenerateSlug: () => void;
	onSaveImageFile: (file: File) => void;
	onRemoveImage: () => void;
	onSubmit: (e: React.FormEvent) => void;
	onCancel: () => void;
}

interface CharCount {
	name: number;
	slug: number;
	description: number;
	keywords: number;
	imageAlt: number;
}

const CategoryForm = ({
	formData,
	errors,
	isSubmitting,
	onFieldChange,
	onGenerateSlug,
	onSaveImageFile,
	onRemoveImage,
	onSubmit,
	onCancel,
}: CategoryFormProps) => {
	const [isUploading, setIsUploading] = useState(false);

	const charCount: CharCount = {
		name: formData.name?.length || 0,
		slug: formData.slug?.length || 0,
		description: formData.description?.length || 0,
		keywords: formData.keywords?.length || 0,
		imageAlt: formData.imageAlt?.length || 0,
	};

	const handleInputChange = (
		field: string,
		value: string,
		maxLength: number
	) => {
		if (value.length <= maxLength) {
			onFieldChange(field, value);
		}
	};

	const handleGenerateSlug = () => {
		onGenerateSlug();
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		if (file.size > 5 * 1024 * 1024) {
			alert("Размер файла не должен превышать 5MB");
			return;
		}

		setIsUploading(true);

		try {
			onSaveImageFile(file);
		} catch (error) {
			console.error("Ошибка при выборе изображения:", error);
			alert("Ошибка при выборе изображения");
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Создание новой категории</h2>
			<form onSubmit={onSubmit} className={styles.form}>
				<ImageSection
					formData={formData}
					errors={errors}
					charCount={charCount}
					isUploading={isUploading}
					isSubmitting={isSubmitting}
					onInputChange={handleInputChange}
					onFileChange={handleFileChange}
					onRemoveImage={onRemoveImage}
				/>
				<FormFields
					formData={formData}
					errors={errors}
					isSubmitting={isSubmitting}
					charCount={charCount}
					onInputChange={handleInputChange}
					onGenerateSlug={handleGenerateSlug}
				/>
				<SubmitSection
					onCancel={onCancel}
					isSubmitting={isSubmitting}
					isUploading={isUploading}
				/>
			</form>
		</div>
	);
};

export default CategoryForm;

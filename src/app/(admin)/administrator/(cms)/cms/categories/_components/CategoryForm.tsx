import { CategoryFormField, CategoryFormProps, CharCount } from "../../types";
import { FormFields } from "./FormFields";
import { ImageSection } from "./ImageSection";
import { SubmitSection } from "./SubmitSection";
import { useCategoryStore } from "@/store/categoryStore";
import styles from "./CategoryForm.module.css";

export const CategoryForm = ({
	errors,
	onFieldChange,
	onGenerateSlug,
	onSaveImageFile,
	onRemoveImage,
	onSubmit,
	onCancel,
}: CategoryFormProps) => {
	const { setIsUploading, formData } = useCategoryStore();

	const charCount: CharCount = {
		name: formData.name.length,
		slug: formData.slug.length,
		description: formData.description.length,
		keywords: formData.keywords.length,
		imageAlt: formData.imageAlt.length,
	};

	const handleInputChange = (
		field: CategoryFormField,
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
					errors={errors}
					charCount={charCount}
					onInputChange={handleInputChange}
					onFileChange={handleFileChange}
					onRemoveImage={onRemoveImage}
				/>
				<FormFields
					errors={errors}
					charCount={charCount}
					onInputChange={handleInputChange}
					onGenerateSlug={handleGenerateSlug}
				/>
				<SubmitSection onCancel={onCancel} />
			</form>
		</div>
	);
};

export default CategoryForm;

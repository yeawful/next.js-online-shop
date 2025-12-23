import { FormFields } from "./FormFields";
import ImageSection from "./ImageSection";
import SubmitSection from "./SubmitSection";
import styles from "./CategoryForm.module.css";

const CategoryForm = ({ formData, errors, onFieldChange, onGenerateSlug }) => {
	// Будем использовать any для совместимости с JS
	const charCount = {
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

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Создание новой категории</h2>
			<form className={styles.form}>
				<ImageSection />
				<FormFields
					formData={formData}
					errors={errors}
					onInputChange={handleInputChange}
					onGenerateSlug={handleGenerateSlug}
					charCount={charCount}
				/>
				<SubmitSection />
			</form>
		</div>
	);
};

export default CategoryForm;

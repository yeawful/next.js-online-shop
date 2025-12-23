import { Loader } from "lucide-react";
import { FormField } from "./FormField";
import { CurrentSettings } from "./CurrentSettings";
import { FormButtons } from "./FormButtons";
import { SEOFormProps } from "../../types/site-settings";
import styles from "./SEOForm.module.css";

export const SEOForm = ({
	formData,
	setFormData,
	settings,
	saving,
	handleSave,
	reloading = false,
}: SEOFormProps) => {
	return (
		<form onSubmit={handleSave} className={styles.form}>
			{reloading && settings && (
				<div className={styles.reloadingOverlay}>
					<Loader className={styles.reloadingSpinner} />
				</div>
			)}

			<div className={styles.formContent}>
				<FormField
					label="Заголовок сайта (Title)"
					value={formData.siteTitle}
					onChange={(value) => setFormData({ ...formData, siteTitle: value })}
					type="text"
					placeholder="Название вашего сайта"
					hint="Отображается в заголовке браузера и поисковых системах (оптимально 50-60 символов)"
					disabled={reloading}
				/>

				<FormField
					label="Мета-описание (Description)"
					value={formData.metaDescription}
					onChange={(value) =>
						setFormData({ ...formData, metaDescription: value })
					}
					type="textarea"
					rows={3}
					placeholder="Краткое описание вашего сайта для поисковых систем"
					hint="Оптимальная длина 150-160 символов. Отображается в сниппете поисковых систем"
					disabled={reloading}
				/>

				<FormField
					label="Ключевые слова сайта"
					value={formData.siteKeywords}
					onChange={(value) =>
						setFormData({ ...formData, siteKeywords: value })
					}
					type="textarea"
					rows={3}
					placeholder="ключевое слово 1, ключевое слово 2, ключевое слово 3"
					hint="Основные ключевые слова, по которым продвигается сайт (не более 10-15 слов)"
					showCommaHint
					disabled={reloading}
				/>

				<FormField
					label="Семантическое ядро"
					value={formData.semanticCore}
					onChange={(value) =>
						setFormData({ ...formData, semanticCore: value })
					}
					type="textarea"
					rows={4}
					placeholder="тематика 1, тематика 2, тематика 3, тематика 4"
					hint="Основные тематики и направления вашего сайта. Используются для структурирования контента"
					showCommaHint
					disabled={reloading}
				/>

				{settings && (
					<div className="relative">
						<CurrentSettings settings={settings} />
						{reloading && (
							<div className={styles.reloadingOverlayCurrent}>
								<Loader className={styles.currentSettingsSpinner} />
							</div>
						)}
					</div>
				)}

				<FormButtons saving={saving} disabled={reloading} />
			</div>
		</form>
	);
};

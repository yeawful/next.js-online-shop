"use client";

import { Loader, Loader2 } from "lucide-react";
import { useSiteSettings } from "../hooks/useSiteSettings";
import Header from "../_components/Header";
import { SEOForm } from "./_components/SEOForm";
import { SEORecommendations } from "../_components/SEORecommendations";
import { commonSeoRecommendations } from "../utils/recommendations";
import styles from "./page.module.css";

const SemanticCorePage = () => {
	const { settings, loading, saving, formData, handleSave, setFormData } =
		useSiteSettings();

	if (loading) {
		return (
			<div className={styles.loadingContainer}>
				<Loader className={styles.loadingSpinner} />
			</div>
		);
	}
	return (
		<>
			{saving && (
				<div className={styles.savingIndicator}>
					<div className={styles.savingContent}>
						<Loader2 className={styles.savingSpinner} />
						<span className={styles.savingText}>Сохранение...</span>
					</div>
				</div>
			)}
			<Header
				title="SEO настройки сайта"
				description="Настройки ключевых слов и семантического ядра для всего сайта"
			/>
			<SEOForm
				formData={formData}
				setFormData={setFormData}
				settings={settings}
				saving={saving}
				handleSave={handleSave}
			/>
			<SEORecommendations recommendations={commonSeoRecommendations} />
		</>
	);
};

export default SemanticCorePage;

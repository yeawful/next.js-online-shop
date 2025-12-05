import SelectRegion from "@/app/(auth)/(reg)/_components/SelectRegion";
import SelectCity from "@/app/(auth)/(reg)/_components/SelectCity";
import { ChangeEvent, useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Edit } from "lucide-react";
import styles from "./LocationSection.module.css";

interface ProfileFormData {
	region: string;
	location: string;
}

const LocationSection = () => {
	const { user, fetchUserData } = useAuthStore();
	const [isEditing, setIsEditing] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [formData, setFormData] = useState<ProfileFormData>({
		region: "",
		location: "",
	});

	useEffect(() => {
		if (user) {
			setFormData({
				region: user.region || "",
				location: user.location || "",
			});
		}
	}, [user]);

	const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setFormData((prev) => ({ ...prev, region: e.target.value }));
		setIsEditing(true);
	};

	const handleCityChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setFormData((prev) => ({ ...prev, location: e.target.value }));
		setIsEditing(true);
	};

	const handleCancel = () => {
		setFormData({
			region: user?.region || "",
			location: user?.location || "",
		});
		setIsEditing(false);
	};

	const handleSave = async () => {
		if (!user?.id) return;

		setIsSaving(true);

		try {
			const response = await fetch("/api/auth/location", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId: user.id,
					region: formData.region,
					location: formData.location,
				}),
			});

			if (!response.ok) {
				throw new Error("Ошибка сохранения");
			}

			await fetchUserData();
			setIsEditing(false);
		} catch (error) {
			console.error("Ошибка при сохранении:", error);
			alert("Не удалось сохранить изменения");
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3 className={styles.sectionTitle}>Местоположение</h3>
				{!isEditing ? (
					<button
						onClick={() => setIsEditing(true)}
						className={styles.editButton}
					>
						<Edit className={styles.editIcon} />
						Редактировать
					</button>
				) : (
					<div className={styles.buttonGroup}>
						<button onClick={handleCancel} className={styles.cancelButton}>
							Отмена
						</button>
						<button
							onClick={handleSave}
							className={styles.saveButton}
							disabled={isSaving}
						>
							{isSaving ? "Сохранение..." : "Сохранить"}
						</button>
					</div>
				)}
			</div>

			<div className={styles.grid}>
				<SelectRegion
					value={formData.region}
					onChangeAction={handleRegionChange}
					className={styles.select}
					disabled={!isEditing}
				/>
				<SelectCity
					value={formData.location}
					onChangeAction={handleCityChange}
					className={styles.select}
					disabled={!isEditing}
				/>
			</div>
		</div>
	);
};

export default LocationSection;

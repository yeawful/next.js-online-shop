import styles from "./statusColorClasses.module.css";

export const getStatusColorClass = (
	statusLabel: string,
	isSelected: boolean = false
): string => {
	switch (statusLabel) {
		case "Новый":
		case "Доставляется":
			return isSelected ? styles.bgLight : styles.textMain;
		case "Собран":
			return isSelected ? styles.bgPrimary : styles.textPrimary;
		case "Подтвержден":
			return isSelected ? styles.bgSuccess : styles.textSuccess;
		case "Не подтвердили":
			return isSelected ? styles.bgOrange : styles.textOrange;
		case "Возврат":
			return isSelected ? styles.bgError : styles.textError;
		case "Вернули":
			return isSelected ? styles.bgBlue : styles.textBlue;
		default:
			return isSelected ? styles.bgLight : styles.textMain;
	}
};

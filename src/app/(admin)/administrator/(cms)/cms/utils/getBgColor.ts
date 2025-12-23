import styles from "./styles.module.css";

export const getBgColor = (color: string): string => {
	const colors: Record<string, string> = {
		blue: styles.bgBlueLight,
		green: styles.bgGreenLight,
		purple: styles.bgPurpleLight,
		indigo: styles.bgIndigoLight,
		orange: styles.bgOrangeLight,
	};
	return colors[color] || styles.bgGrayLight;
};

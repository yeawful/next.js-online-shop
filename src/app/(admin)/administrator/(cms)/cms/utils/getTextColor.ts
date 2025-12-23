import styles from "./styles.module.css";

export const getTextColor = (color: string): string => {
	const colors: Record<string, string> = {
		blue: styles.textBlue,
		green: styles.textGreen,
		purple: styles.textPurple,
		indigo: styles.textIndigo,
		orange: styles.textOrange,
	};
	return colors[color] || styles.textGray;
};

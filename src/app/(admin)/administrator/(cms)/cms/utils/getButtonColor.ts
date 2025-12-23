import styles from "./styles.module.css";

export const getButtonColor = (color: string): string => {
	const colors: Record<string, string> = {
		blue: styles.bgBlue,
		green: styles.bgGreen,
		purple: styles.bgPurple,
		indigo: styles.bgIndigo,
		orange: styles.bgOrange,
	};
	return colors[color] || styles.bgGray;
};

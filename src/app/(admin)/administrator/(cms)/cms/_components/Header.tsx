import { HeaderProps } from "../types/dashboard";
import styles from "./Header.module.css";

export const Header = ({ title, description }: HeaderProps) => {
	return (
		<header className={styles.container}>
			<h1 className={styles.title}>{title}</h1>
			{description && <p className={styles.description}>{description}</p>}
		</header>
	);
};

export default Header;

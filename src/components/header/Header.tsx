import UserBlock from "./UserBlock";
import LogoBlock from "./LogoBlock";
import CatalogMenuWrapper from "./CatalogMenuWrapper";
import styles from "./Header.module.css";

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.headerTop}>
				<LogoBlock />
				<CatalogMenuWrapper />
			</div>
			<UserBlock />
		</header>
	);
};

export default Header;

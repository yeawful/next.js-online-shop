import UserBlock from "../UserBlock/UserBlock";
import LogoBlock from "../LogoBlock/LogoBlock";
import CatalogMenuWrapper from "../CatalogDropMenu/CatalogMenuWrapper";
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

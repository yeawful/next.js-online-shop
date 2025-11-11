import UserBlock from "../UserBlock/UserBlock";
import LogoBlock from "../LogoBlock/LogoBlock";
import SearchBlock from "../SearchBlock/SearchBlock";
import styles from "./Header.module.css";

const Header = () => {
	return (
		<header className={styles.header}>
			<div className={styles.headerTop}>
				<LogoBlock />
				<SearchBlock />
			</div>
			<UserBlock />
		</header>
	);
};

export default Header;

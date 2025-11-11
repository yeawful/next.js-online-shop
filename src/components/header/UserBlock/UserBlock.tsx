import Profile from "../Profile/Profile";
import TopMenu from "../TopMenu/TopMenu";
import styles from "./UserBlock.module.css";

const UserBlock = () => {
	return (
		<nav aria-label="Основное меню">
			<div className={styles.nav}>
				<TopMenu />
				<Profile />
			</div>
		</nav>
	);
};

export default UserBlock;

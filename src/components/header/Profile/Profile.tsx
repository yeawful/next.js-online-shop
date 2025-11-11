import Image from "next/image";
import avatar from "/public/images/graphics/avatar.png";
import iconArrow from "/public/icons-header/icon-arrow.svg";
import styles from "./Profile.module.css";

const Profile = () => {
	return (
		<div className={styles.profile}>
			<Image
				src={avatar}
				alt="Ваш профиль"
				width={40}
				height={40}
				className={styles.avatar}
			/>
			<p className={styles.name}>Алексей</p>
			<button className={styles.arrowButton}>
				<Image
					src={iconArrow}
					alt="Меню профиля"
					width={24}
					height={24}
					sizes="24px"
				/>
			</button>
		</div>
	);
};

export default Profile;

import styles from "./ProfileHeader.module.css";

const ProfileHeader = ({
	name,
	surname,
}: {
	name: string;
	surname: string;
}) => {
	return (
		<div className={styles.header}>
			<h1 className={styles.title}>
				Профиль пользователя: {name} {surname}
			</h1>
			<p className={styles.subtitle}>Управление Вашей учетной записью</p>
		</div>
	);
};

export default ProfileHeader;

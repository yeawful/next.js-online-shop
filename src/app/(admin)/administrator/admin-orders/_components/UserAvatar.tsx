import Image from "next/image";
import { useState, useEffect } from "react";
import { checkAvatarExists } from "../../../../../utils/avatarUtils";
import { getAvatarByGender } from "../../../../../utils/getAvatarByGender";
import styles from "./UserAvatar.module.css";

interface UserAvatarProps {
	userId?: string;
	gender?: string;
	name: string;
}

const UserAvatar = ({ userId, gender, name }: UserAvatarProps) => {
	const [avatarSrc, setAvatarSrc] = useState<string>("");

	useEffect(() => {
		const checkAvatar = async () => {
			if (userId) {
				try {
					const exists = await checkAvatarExists(userId);
					if (exists) {
						setAvatarSrc(`/api/auth/avatar/${userId}?t=${Date.now()}`);
					} else {
						setAvatarSrc(getAvatarByGender(gender));
					}
				} catch {
					setAvatarSrc(getAvatarByGender(gender));
				}
			} else if (gender) {
				setAvatarSrc(getAvatarByGender(gender));
			}
		};

		checkAvatar();
	}, [userId, gender]);

	const handleAvatarError = () => {
		if (gender) {
			setAvatarSrc(getAvatarByGender(gender));
		}
	};

	if (avatarSrc) {
		return (
			<Image
				src={avatarSrc}
				alt={`Аватар ${name}`}
				width={40}
				height={40}
				onError={handleAvatarError}
				className={styles.avatar}
			/>
		);
	}

	return (
		<div className={styles.fallback}>
			<div className={styles.spinner}></div>
		</div>
	);
};

export default UserAvatar;

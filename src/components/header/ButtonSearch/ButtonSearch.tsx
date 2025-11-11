import Image from "next/image";
import styles from "./ButtonSearch.module.css";

const ButtonSearch = () => {
	return (
		<button className={styles.button}>
			<Image
				src="/icons-header/icon-menu.svg"
				alt="menu"
				width={24}
				height={24}
				className={styles.menuIcon}
			/>
			<span className={styles.text}>Каталог</span>
		</button>
	);
};

export default ButtonSearch;

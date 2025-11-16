import Image from "next/image";
import styles from "./ButtonSearch.module.css";
import Link from "next/link";

const ButtonSearch = () => {
	return (
		<Link href="./catalog" className={styles.button}>
			<Image
				src="/icons-header/icon-menu.svg"
				alt="menu"
				width={24}
				height={24}
				className={styles.menuIcon}
			/>
			<span className={styles.text}>Каталог</span>
		</Link>
	);
};

export default ButtonSearch;

import Image from "next/image";
import Link from "next/link";
import styles from "./ButtonSearch.module.css";

const ButtonSearch = () => {
	return (
		<Link href="../catalog" className={styles.buttonSearch}>
			<div className={styles.buttonIcon}>
				<Image
					src="/icons-header/icon-menu.svg"
					alt="menu"
					width={24}
					height={24}
					className={styles.buttonIconImage}
					sizes="24px"
				/>
			</div>

			<span className={styles.buttonText}>Каталог</span>
		</Link>
	);
};

export default ButtonSearch;

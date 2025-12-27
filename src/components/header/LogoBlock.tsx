import Link from "next/link";
import Image from "next/image";
import styles from "./LogoBlock.module.css";

const LogoBlock = () => {
	return (
		<Link href="/" className={styles.link}>
			<div className={styles.logoContainer}>
				<Image
					src="/icons-header/icon-logo.svg"
					alt="Логотип"
					fill
					sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
				/>
			</div>
			<div className={styles.textContainer}>
				<Image
					src="/icons-header/icon-text.png"
					alt="Северяночка"
					fill
					sizes="100px"
				/>
			</div>
		</Link>
	);
};

export default LogoBlock;

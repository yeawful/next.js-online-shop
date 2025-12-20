import styles from "./ViewAllButton.module.css";
import Image from "next/image";
import Link from "next/link";

const ViewAllButton = ({
	btnText,
	href,
}: {
	btnText: string;
	href: string;
}) => {
	return (
		<Link href={href} className={styles.viewAllButton}>
			<p className={styles.viewAllText}>{btnText}</p>
			<Image
				src="/icons-products/icon-arrow-right.svg"
				alt={btnText}
				width={24}
				height={24}
				sizes="24px"
			/>
		</Link>
	);
};

export default ViewAllButton;

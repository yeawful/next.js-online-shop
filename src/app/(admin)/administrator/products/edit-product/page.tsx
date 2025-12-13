import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import styles from "./page.module.css";

const EditProductHeader = () => {
	return (
		<div className={styles.container}>
			<Link
				href="/administrator/products/products-list"
				className={styles.backLink}
			>
				<ArrowLeft className={styles.backIcon} />
				Для редактирования найдите товар
			</Link>
			<h1 className={styles.title}>Редактировать товар</h1>
		</div>
	);
};

export default EditProductHeader;

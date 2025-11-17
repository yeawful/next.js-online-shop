import Link from "next/link";
import Image from "next/image";
import { GridCategoryBlockProps } from "@/types/categoryBlockProps";
import styles from "./GridCategoryBlock.module.css";

const GridCategoryBlock = ({ id, title, img }: GridCategoryBlockProps) => {
	return (
		<Link href={`category-${id}`} className={styles.categoryLink}>
			<Image
				src={img}
				alt={title}
				fill
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				className={styles.categoryImage}
				priority
			/>
			<div className={styles.categoryOverlay}></div>
			<div className={styles.categoryTitle}>
				<span className={styles.categoryText}>{title}</span>
			</div>
		</Link>
	);
};

export default GridCategoryBlock;

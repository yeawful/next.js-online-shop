import Link from "next/link";
import Image from "next/image";
import { GridCategoryBlockProps } from "@/types/categoryBlockProps";
import styles from "./GridCategoryBlock.module.css";

const GridCategoryBlock = ({
	slug,
	title,
	img,
	priority = false,
}: GridCategoryBlockProps) => {
	return (
		<Link href={`/catalog/${slug}`} className={styles.categoryBlock}>
			<Image
				src={img}
				alt={title}
				fill
				sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				className={styles.categoryImage}
				priority={priority}
				quality={priority ? 90 : 75}
				loading={priority ? "eager" : "lazy"}
			/>
			<div className={styles.gradientOverlay}></div>
			<div className={styles.categoryTitle}>
				<span className={styles.categoryText}>{title}</span>
			</div>
		</Link>
	);
};

export default GridCategoryBlock;

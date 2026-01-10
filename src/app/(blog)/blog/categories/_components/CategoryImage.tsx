import Image from "next/image";
import { CategoryImageProps } from "../types/categories.types";
import { getImagePath } from "../utils/getImagePath";
import styles from "./CategoryImage.module.css";

export default function CategoryImage({
	hasImage,
	image,
	imageAlt,
	gradientClass,
	name,
	priority,
}: CategoryImageProps) {
	const imagePath = getImagePath(hasImage ? image : "");

	return (
		<div className={styles.imageContainer}>
			{hasImage ? (
				<Image
					src={imagePath}
					alt={imageAlt}
					fill
					className={styles.image}
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
					priority={priority}
					quality={70}
					loading={priority ? "eager" : "lazy"}
				/>
			) : (
				<div className={`${styles.gradientContainer} ${gradientClass}`}>
					<div className={styles.textContainer}>
						<div className={styles.categoryName}>{name}</div>
					</div>
				</div>
			)}
		</div>
	);
}

import { ProductCardProps } from "@/types/product";
import Image from "next/image";
import styles from "./ImagesBlock.module.css";

const ImagesBlock = ({ product }: { product: ProductCardProps }) => {
	return (
		<div className={styles.container}>
			<div className={styles.thumbnails}>
				{[...Array(5)].map((_, index) => (
					<div key={index} className={styles.thumbnail}>
						<Image
							src={product.img}
							alt={`${product.title} - миниатюра ${index + 1}`}
							fill
							className={styles.thumbnailImage}
							sizes="64px"
						/>
					</div>
				))}
			</div>

			<div className={styles.mainImage}>
				<Image
					src={product.img}
					alt={product.title}
					fill
					className={styles.image}
					sizes="(max-width: 768px) 248px, (max-width: 1032px) 272px, 504px"
					priority
				/>
				{product.discountPercent && product.discountPercent > 0 ? (
					<div className={styles.discountBadge}>
						-{product.discountPercent}%
					</div>
				) : null}
			</div>
		</div>
	);
};

export default ImagesBlock;

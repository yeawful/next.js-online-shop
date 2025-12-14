import { memo } from "react";
import Image from "next/image";
import styles from "./ProductImage.module.css";

interface ProductImageProps {
	productId: string;
	title: string;
}

const ProductImage = memo(function ProductImage({
	productId,
	title,
}: ProductImageProps) {
	return (
		<div className={styles.container}>
			<Image
				src={`/images/products/img-${productId}.jpeg`}
				alt={title}
				width={80}
				height={60}
				className={styles.image}
			/>
		</div>
	);
});

export default ProductImage;

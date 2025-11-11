import Image from "next/image";
import styles from "./SlideOne.module.css";

const SlideOne = () => {
	return (
		<div className={styles.slideOne}>
			<div className={styles.slideOneOverlay}></div>

			<div className={styles.slideOneContent}>
				<div className={styles.slideOneImage}>
					<Image
						src="/images/graphics/food.png"
						alt="Слайд"
						fill
						sizes="(max-width: 768px) 50px, (max-width: 1200px) 75px, 100px"
					/>
				</div>

				<h2 className={styles.slideOneTitle}>Доставка бесплатно от 1000 ₽</h2>
			</div>
		</div>
	);
};

export default SlideOne;

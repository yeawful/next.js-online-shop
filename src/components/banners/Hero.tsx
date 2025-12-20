import Image from "next/image";
import styles from "./Hero.module.css";

const Hero = () => {
	return (
		<div className={styles.hero}>
			<div className={styles.heroOverlay}></div>

			<div className={styles.heroContent}>
				<div className={styles.heroImage}>
					<Image
						src="/images/graphics/food.svg"
						alt="Слайд"
						fill
						sizes="(max-width: 768px) 50px, (max-width: 1200px) 75px, 100px"
						loading="eager"
					/>
				</div>

				<h2 className={styles.heroTitle}>Доставка бесплатно от 1000 ₽</h2>
			</div>
		</div>
	);
};

export default Hero;

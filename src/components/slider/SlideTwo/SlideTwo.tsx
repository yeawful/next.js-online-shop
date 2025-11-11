import Image from "next/image";
import styles from "./SlideTwo.module.css";

const SlideTwo = () => {
	return (
		<div className={styles.slideTwo}>
			<Image
				src="/images/graphics/slide-2.jpeg"
				alt="Слайд"
				fill
				priority
				className={styles.slideTwoImage}
			/>
		</div>
	);
};

export default SlideTwo;

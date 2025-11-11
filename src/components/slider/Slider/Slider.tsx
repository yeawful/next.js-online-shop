"use client";

import { motion } from "framer-motion";
import SlideOne from "../SlideOne/SlideOne";
import SlideTwo from "../SlideTwo/SlideTwo";
import styles from "./Slider.module.css";

const Slider = () => {
	const slides = [<SlideOne key="slide1" />, <SlideTwo key="slide2" />];

	return (
		<div className={styles.slider}>
			{slides.map((slide, index) => (
				<motion.div
					key={`slide-${index}`}
					initial={{ opacity: 0 }}
					animate={{ opacity: [0, 1, 1, 0] }}
					transition={{
						duration: 5,
						repeat: Infinity,
						repeatDelay: slides.length * 5 - 5,
						delay: index * 5,
					}}
					className={styles.slideItem}
				>
					{slide}
				</motion.div>
			))}
		</div>
	);
};

export default Slider;

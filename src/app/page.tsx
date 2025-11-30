import Actions from "./(products)/Actions";
import Hero from "@/components/banners/Hero/Hero";
import NewProducts from "./(products)/NewProducts";
import Purchases from "@/app/(user)/Purchases";
import SpecialOffers from "@/components/banners/SpecialOffers/SpecialOffers";
import Maps from "@/components/maps/Maps";
import Articles from "@/app/(articles)/Articles";
import { Loader } from "@/components/loaders/Loader";
import { Suspense } from "react";
import styles from "./page.module.css";

export default function Home() {
	return (
		<main className={styles.main}>
			<Suspense fallback={<Loader text="баннера" />}>
				<Hero />
			</Suspense>

			<div className={styles.components}>
				{[
					{ component: <Actions />, text: "акций" },
					{ component: <NewProducts />, text: "новинок" },
					{ component: <Purchases />, text: "Ваших покупок" },
					{ component: <SpecialOffers />, text: "специальных предложений" },
					{ component: <Maps />, text: "карт" },
					{ component: <Articles />, text: "статей" },
				].map((item, index) => (
					<Suspense key={index} fallback={<Loader text={item.text} />}>
						{item.component}
					</Suspense>
				))}
			</div>
		</main>
	);
}

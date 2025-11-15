import Actions from "./(products)/Actions";
import styles from "./Home.module.css";
import Hero from "@/components/banners/Hero/Hero";
import NewProducts from "./(products)/NewProducts";
import Purchases from "@/app/(user)/Purchases";
import SpecialOffers from "@/components/banners/SpecialOffers/SpecialOffers";
import Maps from "@/components/maps/Maps";
import Articles from "@/app/(articles)/Articles";

export default function Home() {
	return (
		<main className={styles.main}>
			<Hero />
			<div className={styles.components}>
				<Actions />
				<NewProducts />
				<Purchases />
				<SpecialOffers />
				<Maps />
				<Articles />
			</div>
		</main>
	);
}

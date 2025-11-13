import Actions from "@/components/products/Actions/Actions";
import styles from "./Home.module.css";
import Hero from "@/components/banners/Hero/Hero";
import NewProducts from "@/components/products/NewProducts/NewProducts";
import Purchases from "@/components/products/Purchases/Purchases";
import SpecialOffers from "@/components/banners/SpecialOffers/SpecialOffers";
import Maps from "@/components/maps/Maps";
import Articles from "@/components/articles/Articles";

export default function Home() {
	return (
		<main className={styles.main}>
			<Hero />
			<div className={styles.products}>
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

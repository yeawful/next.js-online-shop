import Actions from "@/components/products/Actions/Actions";
import styles from "./Home.module.css";
import Hero from "@/components/hero/Hero";
import NewProducts from "@/components/products/NewProducts/NewProducts";

export default function Home() {
	return (
		<main className={styles.main}>
			<Hero />
			<div className={styles.products}>
				<Actions />
				<NewProducts />
			</div>
		</main>
	);
}

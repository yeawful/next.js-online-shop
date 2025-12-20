import Image from "next/image";
import styles from "./SpecialOffers.module.css";

const SpecialOffers = () => {
	return (
		<section className={styles.specialOffers}>
			<div className={styles.specialOffersContainer}>
				<h2 className={styles.specialOffersTitle}>Специальные предложения</h2>
				<div className={styles.offersContent}>
					<button className={styles.cardBanner}>
						<div className={styles.cardBannerContent}>
							<p className={styles.cardBannerTitle}>
								Оформите карту «Северяночка»
							</p>
							<p className={styles.cardBannerText}>
								И получайте бонусы при покупке в магазинах и на сайте
							</p>
						</div>
						<Image
							src="/images/banners/banner-card-image.png"
							alt="Оформите карту"
							width={220}
							height={110}
							className={styles.cardBannerImage}
						/>
					</button>

					<button className={`${styles.cardBanner} ${styles.cardBannerAction}`}>
						<div className={styles.cardBannerContent}>
							<p className={styles.cardBannerTitle}>
								Покупайте акционные товары
							</p>
							<p className={styles.cardBannerText}>
								И получайте вдвое больше бонусов
							</p>
						</div>
						<Image
							src="/images/banners/banner-card-image2.png"
							alt="Оформите карту"
							width={220}
							height={100}
							className={styles.bannerImage}
						/>
					</button>
				</div>
			</div>
		</section>
	);
};

export default SpecialOffers;

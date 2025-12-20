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
					<button className={styles.actionBanner}>
						<div className={styles.mobTabBanner}>
							<Image
								src="/images/banners/banner-action-mob-tab.jpeg"
								alt="Акционные товары"
								width={353}
								height={170}
								className={styles.bannerImage}
								priority
							/>
						</div>
						<div className={styles.deskBanner}>
							<Image
								src="/images/banners/banner-action-desk.jpeg"
								alt="Акционные товары"
								width={584}
								height={200}
								className={styles.bannerImage}
								priority
							/>
						</div>
					</button>
				</div>
			</div>
		</section>
	);
};

export default SpecialOffers;

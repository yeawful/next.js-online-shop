"use client";

import { YMaps, Map, Placemark } from "@iminside/react-yandex-maps";
import { useState } from "react";
import { locations } from "../../data/location";
import styles from "./Maps.module.css";

const Maps = () => {
	const [currentLocation, setCurrentLocation] = useState("archangelsk");
	const currentLocationData = locations[currentLocation];

	return (
		<YMaps
			query={{
				lang: "ru_RU",
				apikey: "1ac61b8a-843f-454f-abd8-a651a3c60f00",
				load: "package.full",
			}}
		>
			<section>
				<div className={styles.maps}>
					<h2 className={styles.mapsTitle}>Наши магазины</h2>
					<div className={styles.locationButtons}>
						{Object.keys(locations).map((key) => {
							const isActive = currentLocation === key;
							return (
								<button
									key={key}
									onClick={() => setCurrentLocation(key)}
									className={`${styles.locationButton} ${
										isActive
											? styles.locationButtonActive
											: styles.locationButtonInactive
									}`}
								>
									{locations[key].name}
								</button>
							);
						})}
					</div>
					<Map
						options={{ suppressMapOpenBlock: true }}
						defaultState={{ center: currentLocationData.center, zoom: 12 }}
						state={{ center: currentLocationData.center, zoom: 12 }}
						width="100%"
						height="354px"
					>
						{locations[currentLocation].shops.map((shop) => (
							<Placemark
								key={shop.id}
								geometry={shop.coordinates}
								properties={{
									hintContent: shop.name,
								}}
								options={{
									iconLayout: "default#image",
									iconImageHref: "/icons-map/icon-location.svg",
									iconImageSize: [32, 32],
									iconOffset: [-16, -16],
								}}
							/>
						))}
					</Map>
				</div>
			</section>
		</YMaps>
	);
};

export default Maps;

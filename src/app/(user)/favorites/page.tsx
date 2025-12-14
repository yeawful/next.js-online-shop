import GenericListPage from "@/app/(products)/GenericListPage";
import { Loader } from "@/components/loaders/Loader";
import { Suspense } from "react";
import { TRANSLATIONS } from "../../../utils/translations";
import FilterButtons from "@/components/filter/FilterButtons";
import FilterControls from "@/components/filter/FilterControls";
import PriceFilter from "@/components/filter/PriceFilter";
import DropFilter from "@/components/filter/DropFilter";
import { headers } from "next/headers";
import {
	getCustomSessionToken,
	getValidCustomSession,
} from "../../../utils/auth-helpers";
import fetchFavorites from "./fetchFavorites";
import styles from "./page.module.css";

async function getServerUserId() {
	try {
		const headersList = await headers();
		const cookies = headersList.get("cookie");
		const sessionToken = getCustomSessionToken(cookies);
		if (!sessionToken) return null;
		const session = await getValidCustomSession(sessionToken);
		return session?.userId || null;
	} catch {
		return null;
	}
}

const FavoritesPage = async ({
	searchParams,
}: {
	searchParams: Promise<{
		page?: string;
		itemsPerPage?: string;
		filter?: string | string[];
		priceFrom?: string;
		priceTo?: string;
		inStock?: string;
	}>;
	params: Promise<{ category: string }>;
}) => {
	const category = "favorites";
	const resolvedSearchParams = await searchParams;
	const activeFilter = resolvedSearchParams.filter;
	const priceFrom = resolvedSearchParams.priceFrom;
	const priceTo = resolvedSearchParams.priceTo;
	const inStock = resolvedSearchParams.inStock === "true";

	const userId = await getServerUserId();

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{TRANSLATIONS[category] || category}</h1>
			<div className={styles.mobileFilter}>
				<DropFilter
					basePath={`/${category}`}
					category={category}
					userId={userId}
					apiEndpoint="users/favorites/products"
				/>
			</div>
			<div className={styles.desktopFilter}>
				<FilterButtons basePath={`/${category}`} />
			</div>
			<div className={styles.layout}>
				<div className={styles.sidebar}>
					<div className={styles.filterHeader}>Фильтр</div>
					<PriceFilter
						basePath={`/${category}`}
						category={category}
						userId={userId}
						apiEndpoint="users/favorites/products"
					/>
				</div>
				<div className={styles.content}>
					<div className={styles.desktopControls}>
						<FilterControls basePath={`/${category}`} />
					</div>

					<Suspense fallback={<Loader />}>
						<GenericListPage
							searchParams={Promise.resolve(resolvedSearchParams)}
							props={{
								fetchData: ({ pagination: { startIdx, perPage } }) =>
									fetchFavorites({
										pagination: { startIdx, perPage },
										filter: activeFilter,
										priceFrom,
										priceTo,
										inStock,
										userId,
									}),
								basePath: `/${category}`,
								contentType: "category",
							}}
						/>
					</Suspense>
				</div>
			</div>
		</div>
	);
};

export default FavoritesPage;

import GenericListPage from "@/app/(products)/GenericListPage";
import { Loader } from "@/components/loaders/Loader";
import { Suspense } from "react";
import { TRANSLATIONS } from "../../../../utils/translations";
import fetchProductsByCategory from "../fetchCategory";
import FilterButtons from "../FilterButtons";
import FilterControls from "../FilterControls";
import PriceFilter from "../PriceFilter";
import DropFilter from "../DropFilter";
import styles from "./page.module.css";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ category: string }>;
}) {
	const { category } = await params;
	return {
		title: TRANSLATIONS[category] || category,
		description: `Описание категории товаров "${
			TRANSLATIONS[category] || category
		}" магазина "Северяночка"`,
	};
}

const CategoryPage = async ({
	searchParams,
	params,
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
	const { category } = await params;
	const resolvedSearchParams = await searchParams;
	const activeFilter = resolvedSearchParams.filter;
	const priceFrom = resolvedSearchParams.priceFrom;
	const priceTo = resolvedSearchParams.priceTo;
	const inStock = resolvedSearchParams.inStock === "true";

	return (
		<div className={styles.categoryPage}>
			<h1 className={styles.categoryTitle}>
				{TRANSLATIONS[category] || category}
			</h1>
			<DropFilter basePath={`/category/${category}`} category={category} />
			<div className={styles.filterButtonsDesktop}>
				<FilterButtons basePath={`/category/${category}`} />
			</div>
			<div className={styles.categoryContent}>
				<div className={styles.filtersSidebar}>
					<div className={styles.filterHeader}>Фильтр</div>
					<PriceFilter basePath={`/category/${category}`} category={category} />
				</div>
				<div className={styles.productsContent}>
					<div className={styles.filterControlsDesktop}>
						<FilterControls
							activeFilter={resolvedSearchParams.filter}
							basePath={`/category/${category}`}
						/>
					</div>

					<Suspense fallback={<Loader />}>
						<GenericListPage
							searchParams={Promise.resolve(resolvedSearchParams)}
							props={{
								fetchData: ({ pagination: { startIdx, perPage } }) =>
									fetchProductsByCategory(category, {
										pagination: { startIdx, perPage },
										filter: activeFilter,
										priceFrom,
										priceTo,
										inStock,
									}),
								basePath: `/category/${category}`,
								contentType: "category",
							}}
						/>
					</Suspense>
				</div>
			</div>
		</div>
	);
};

export default CategoryPage;

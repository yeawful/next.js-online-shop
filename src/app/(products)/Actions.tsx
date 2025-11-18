import fetchProductsByCategory from "./fetchProducts";
import ProductsSection from "@/components/products/ProductsSection/ProductsSection";
import { CONFIG } from "../../../config/config";

const Actions = async () => {
	try {
		const { items } = await fetchProductsByCategory("actions", {
			randomLimit: CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS,
		});

		return (
			// eslint-disable-next-line react-hooks/error-boundaries
			<ProductsSection
				title="Акции"
				viewAllButton={{ text: "Все акции", href: "actions" }}
				products={items}
			/>
		);
	} catch {
		return <div className="error">Ошибка: не удалось загрузить акции</div>;
	}
};

export default Actions;

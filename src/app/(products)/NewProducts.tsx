import fetchProductsByTag from "@/app/(products)/fetchProducts";
import ProductsSection from "../../components/products/ProductsSection/ProductsSection";
import { CONFIG } from "../../../config/config";

const NewProducts = async () => {
	try {
		const { items } = await fetchProductsByTag("new", {
			randomLimit: CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS,
		});

		return (
			// eslint-disable-next-line react-hooks/error-boundaries
			<ProductsSection
				title="Новинки"
				viewAllButton={{ text: "Все новинки", href: "new" }}
				products={items}
			/>
		);
	} catch {
		return <div className="error">Ошибка: не удалось загрузить новинки</div>;
	}
};

export default NewProducts;

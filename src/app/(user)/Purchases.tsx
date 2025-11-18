import fetchPurchases from "./fetchPurchases";
import ProductsSection from "@/components/products/ProductsSection/ProductsSection";
import { CONFIG } from "../../../config/config";

const Purchases = async () => {
	try {
		const { items } = await fetchPurchases({
			userPurchasesLimit: CONFIG.ITEMS_PER_PAGE_MAIN_PRODUCTS,
		});

		return (
			// eslint-disable-next-line react-hooks/error-boundaries
			<ProductsSection
				title="Покупали раньше"
				viewAllButton={{ text: "Все покупки", href: "purchases" }}
				products={items}
			/>
		);
	} catch {
		return (
			<div className="error">Ошибка: не удалось загрузить Ваши покупки</div>
		);
	}
};

export default Purchases;

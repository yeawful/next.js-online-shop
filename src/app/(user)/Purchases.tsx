import fetchPurchases from "./fetchPurchases";
import ProductsSection from "@/components/products/ProductsSection/ProductsSection";
import { CONFIG } from "../../../config/config";
import ErrorComponent from "@/components/error/ErrorComponent";

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
	} catch (error) {
		return (
			<ErrorComponent
				error={error instanceof Error ? error : new Error(String(error))}
				userMessage="Не удалось загрузить Ваши покупки"
			/>
		);
	}
};

export default Purchases;

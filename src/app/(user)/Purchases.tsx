import fetchPurchases from "./fetchPurchases";
import ProductsSection from "@/components/products/ProductsSection/ProductsSection";

const Purchases = async () => {
	try {
		const purchases = await fetchPurchases();

		return (
			// eslint-disable-next-line react-hooks/error-boundaries
			<ProductsSection
				title="Покупали раньше"
				viewAllButton={{ text: "Все покупки", href: "purchases" }}
				products={purchases}
				compact
			/>
		);
	} catch {
		return (
			<div className="error">Ошибка: не удалось загрузить Ваши покупки</div>
		);
	}
};

export default Purchases;

import fetchPurchases from "../fetchPurchases";
import ProductsSection from "@/components/products/ProductsSection/ProductsSection";

const AllPurchases = async () => {
	try {
		const purchases = await fetchPurchases();

		return (
			// eslint-disable-next-line react-hooks/error-boundaries
			<ProductsSection
				title="Все покупки"
				viewAllButton={{ text: "На главную", href: "/" }}
				products={purchases}
			/>
		);
	} catch {
		return <div className="error">Ошибка: не удалось загрузить покупки</div>;
	}
};

export default AllPurchases;

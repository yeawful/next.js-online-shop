import ProductsSection from "@/components/products/ProductsSection/ProductsSection";
import fetchProductsByCategory from "../fetchProducts";

export const metadata = {
	title: 'Акции магазина "Северяночка"',
	description: 'Акционные товары магазина "Северяночка"',
};

const AllActions = async () => {
	try {
		const products = await fetchProductsByCategory("actions");

		return (
			// eslint-disable-next-line react-hooks/error-boundaries
			<ProductsSection
				title="Все акции"
				viewAllButton={{ text: "На главную", href: "/" }}
				products={products}
			/>
		);
	} catch {
		return <div className="error">Ошибка: не удалось загрузить акции</div>;
	}
};

export default AllActions;

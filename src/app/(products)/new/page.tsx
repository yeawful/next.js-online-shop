import fetchProductsByCategory from "../fetchProducts";
import ProductsSection from "@/components/products/ProductsSection/ProductsSection";

export const metadata = {
	title: 'Новинки магазина "Северяночка"',
	description: 'Новые товары магазина "Северяночка"',
};

const AllNew = async () => {
	try {
		const products = await fetchProductsByCategory("new");

		return (
			// eslint-disable-next-line react-hooks/error-boundaries
			<ProductsSection
				title="Все новинки"
				viewAllButton={{ text: "На главную", href: "/" }}
				products={products}
			/>
		);
	} catch {
		return <div className="error">Ошибка: не удалось загрузить акции</div>;
	}
};

export default AllNew;

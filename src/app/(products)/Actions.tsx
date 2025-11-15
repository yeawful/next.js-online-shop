import fetchProductsByCategory from "@/app/(products)/fetchProducts";
import ProductsSection from "../../components/products/ProductsSection/ProductsSection";

const Actions = async () => {
	try {
		const products = await fetchProductsByCategory("actions");

		return (
			// eslint-disable-next-line react-hooks/error-boundaries
			<ProductsSection
				title="Акции"
				viewAllButton={{ text: "Все акции", href: "actions" }}
				products={products}
				compact
			/>
		);
	} catch {
		return <div className="error">Ошибка: не удалось загрузить акции</div>;
	}
};

export default Actions;

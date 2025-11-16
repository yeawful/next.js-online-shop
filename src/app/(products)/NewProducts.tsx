import fetchProductsByCategory from "@/app/(products)/fetchProducts";
import ProductsSection from "../../components/products/ProductsSection/ProductsSection";
import { shuffleArray } from "@/utils/shuffleArray";

const NewProducts = async () => {
	try {
		let products = await fetchProductsByCategory("new");
		products = shuffleArray(products);

		return (
			// eslint-disable-next-line react-hooks/error-boundaries
			<ProductsSection
				title="Новинки"
				viewAllButton={{ text: "Все новинки", href: "new" }}
				products={products}
				compact
			/>
		);
	} catch {
		return <div className="error">Ошибка: не удалось загрузить акции</div>;
	}
};

export default NewProducts;

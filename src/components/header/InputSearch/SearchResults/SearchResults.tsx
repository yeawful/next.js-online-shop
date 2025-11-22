import Image from "next/image";
import Link from "next/link";
import iconBurger from "/public/icons-header/icon-burger-menu.svg";
import { TRANSLATIONS } from "../../../../utils/translations";
import HighlightText from "../../HighlightText/HighlightText";
import MiniLoader from "@/components/loaders/MiniLoader";
import { SearchResultsProps } from "@/types/searchResultsProps";
import styles from "./SearchResults.module.css";

const SearchResults = ({
	isLoading,
	query,
	groupedProducts,
	resetSearch,
}: SearchResultsProps) => {
	if (isLoading) return <MiniLoader />;

	if (groupedProducts.length > 0) {
		return (
			<div className={styles.searchResults}>
				{groupedProducts.map((group) => (
					<div key={group.category} className={styles.categoryGroup}>
						<Link
							href={`/category/${encodeURIComponent(group.category)}`}
							className={styles.categoryLink}
							onClick={resetSearch}
						>
							<div>
								<HighlightText
									text={TRANSLATIONS[group.category] || group.category}
									highlight={query}
								/>
							</div>
							<Image
								src={iconBurger}
								alt={TRANSLATIONS[group.category] || group.category}
								width={24}
								height={24}
								className={styles.categoryIcon}
							/>
						</Link>
						<ul className={styles.productsList}>
							{group.products.map((product) => (
								<li key={product.id} className={styles.productItem}>
									<Link
										href={`/product/${product.id}`}
										className={styles.productLink}
										onClick={resetSearch}
									>
										<HighlightText text={product.title} highlight={query} />
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		);
	}

	if (query.length > 1) {
		return <div className={styles.noResults}>Ничего не найдено</div>;
	}

	return (
		<div className={styles.enterText}>
			Введите 2 и более символов для поиска
		</div>
	);
};

export default SearchResults;

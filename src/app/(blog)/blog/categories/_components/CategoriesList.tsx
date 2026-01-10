import { BlogCategoriesListProps } from "../types/categories.types";
import CategoryCard from "./CategoryCard";
import styles from "./CategoriesList.module.css";

export default async function CategoriesList({
	categories,
}: BlogCategoriesListProps) {
	const getDelayClass = (index: number) => {
		const delay = Math.min(index, 8);
		switch (delay) {
			case 0:
				return styles.delay0;
			case 1:
				return styles.delay1;
			case 2:
				return styles.delay2;
			case 3:
				return styles.delay3;
			case 4:
				return styles.delay4;
			case 5:
				return styles.delay5;
			case 6:
				return styles.delay6;
			case 7:
				return styles.delay7;
			case 8:
				return styles.delay8;
			default:
				return styles.delay0;
		}
	};

	return (
		<div className={styles.grid}>
			{categories.map((category, index) => {
				const delayClass = getDelayClass(index);

				return (
					<div
						key={category._id}
						className={`${styles.cardWrapper} ${delayClass}`}
					>
						<CategoryCard category={category} priority={index < 4} />
					</div>
				);
			})}
		</div>
	);
}

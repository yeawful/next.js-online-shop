import ErrorComponent from "@/components/ui/ErrorComponent";
import MiniLoader from "@/components/ui/MiniLoader";
import { CatalogMenuProps } from "@/types/catalogMenuProps";
import Link from "next/link";
import SearchBlock from "./SearchBlock";
import styles from "./CatalogMenu.module.css";

const CatalogMenu = ({
	isLoading,
	isCatalogOpen,
	setIsCatalogOpen,
	categories,
	searchBlockRef,
	menuRef,
	error,
	onMouseEnter,
	onFocusChangeAction,
}: CatalogMenuProps) => {
	return (
		<>
			<div
				className={styles.searchContainer}
				onMouseEnter={onMouseEnter}
				ref={searchBlockRef}
			>
				<SearchBlock onFocusChangeAction={onFocusChangeAction} />
			</div>

			{isCatalogOpen && (
				<div ref={menuRef} className={styles.catalogMenu}>
					<div className={styles.catalogMenuContent}>
						{error && (
							<ErrorComponent
								error={error.error}
								userMessage={error.userMessage}
							/>
						)}
						{isLoading ? (
							<MiniLoader />
						) : categories && categories.length > 0 ? (
							<div className={styles.categoriesGrid}>
								{categories.map((category) => (
									<Link
										key={category.slug}
										href={`/catalog/${category.slug}`}
										className={styles.categoryLink}
										onClick={() => setIsCatalogOpen(false)}
									>
										{category.title}
									</Link>
								))}
							</div>
						) : (
							!isLoading && (
								<div className={styles.noCategoriesText}>
									Нет доступных категорий
								</div>
							)
						)}
					</div>
				</div>
			)}
		</>
	);
};

export default CatalogMenu;

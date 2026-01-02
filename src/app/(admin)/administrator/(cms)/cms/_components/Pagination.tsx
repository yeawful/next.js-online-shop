"use client";

import { useCategoryStore } from "@/store/categoryStore";
import { CONFIG_BLOG } from "../CONFIG_BLOG";
import styles from "./Pagination.module.css";

export const Pagination = () => {
	const { totalPages, totalItems, currentPage, itemsPerPage, setCurrentPage } =
		useCategoryStore();

	const startItem = (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	const handlePageChange = (pageNum: number) => {
		setCurrentPage(pageNum);
	};

	const renderPageButtons = () => {
		const buttons = [];
		const maxVisibleButtons = CONFIG_BLOG.MAX_VISIBLE_BUTTONS;

		if (totalPages <= maxVisibleButtons) {
			for (let i = 1; i <= totalPages; i++) {
				buttons.push(i);
			}
		} else if (currentPage <= 3) {
			for (let i = 1; i <= maxVisibleButtons; i++) {
				buttons.push(i);
			}
		} else if (currentPage >= totalPages - 2) {
			for (let i = totalPages - maxVisibleButtons + 1; i <= totalPages; i++) {
				buttons.push(i);
			}
		} else {
			for (let i = currentPage - 2; i <= currentPage + 2; i++) {
				buttons.push(i);
			}
		}

		return buttons.map((pageNum) => (
			<button
				key={pageNum}
				onClick={() => handlePageChange(pageNum)}
				className={`${styles.pageButton} ${
					currentPage === pageNum ? styles.pageButtonActive : ""
				}`}
			>
				{pageNum}
			</button>
		));
	};

	return (
		<div className={styles.paginationContainer}>
			<div className={styles.paginationInfo}>
				<div className={styles.infoText}>
					Показано {startItem}-{endItem} из {totalItems} элементов
					<span className={styles.infoDot}>•</span>
					Страница <span className={styles.infoPageNumber}>
						{currentPage}
					</span>{" "}
					из <span className={styles.infoPageNumber}>{totalPages}</span>
				</div>
				<div className={styles.buttonsContainer}>
					<button
						onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
						disabled={currentPage === 1}
						className={styles.navButton}
					>
						Назад
					</button>
					{renderPageButtons()}
					<button
						onClick={() =>
							handlePageChange(Math.min(totalPages, currentPage + 1))
						}
						disabled={currentPage === totalPages}
						className={styles.navButton}
					>
						Вперед
					</button>
				</div>
			</div>
		</div>
	);
};

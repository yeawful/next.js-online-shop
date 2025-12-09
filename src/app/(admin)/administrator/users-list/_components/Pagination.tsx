import styles from "./Pagination.module.css";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
}

const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) => {
	if (totalPages <= 1) return null;

	const getVisiblePages = () => {
		const maxVisible = 5;
		const pages = [];

		if (totalPages <= maxVisible) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			let start = Math.max(1, currentPage - 2);
			const end = Math.min(totalPages, start + maxVisible - 1);

			if (end - start + 1 < maxVisible) {
				start = end - maxVisible + 1;
			}

			for (let i = start; i <= end; i++) {
				pages.push(i);
			}
		}

		return pages;
	};

	return (
		<div className={styles.container}>
			<div className={styles.buttonsContainer}>
				<button
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className={styles.navButton}
				>
					Назад
				</button>

				{getVisiblePages().map((page) => (
					<button
						key={page}
						onClick={() => onPageChange(page)}
						className={`${styles.pageButton} ${
							currentPage === page ? styles.buttonActive : styles.buttonInactive
						}`}
					>
						{page}
					</button>
				))}

				<button
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className={styles.navButton}
				>
					Вперед
				</button>
			</div>
		</div>
	);
};

export default Pagination;

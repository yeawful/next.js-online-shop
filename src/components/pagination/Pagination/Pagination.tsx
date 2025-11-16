"use client";

import { PaginationProps } from "@/types/paginationProps";
import Link from "next/link";
import styles from "./Pagination.module.css";

const createPageUrl = (
	basePath: string,
	params: URLSearchParams,
	page: number
) => {
	const newParams = new URLSearchParams(params);
	newParams.set("page", page.toString());
	return `${basePath}?${newParams.toString()}`;
};

const getVisiblePages = (totalPages: number, currentPage: number) => {
	if (totalPages <= 5) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	let start = Math.max(1, currentPage - 2);
	let end = Math.min(totalPages, currentPage + 2);

	if (currentPage <= 3) {
		end = 5;
	} else if (currentPage >= totalPages - 2) {
		start = totalPages - 4;
	}

	const pages: (number | string)[] = [];

	if (start > 1) pages.push(1);

	if (start > 2) pages.push("...");

	for (let i = start; i <= end; i++) pages.push(i);

	if (end < totalPages - 1) pages.push("...");

	if (end < totalPages) pages.push(totalPages);

	return pages;
};

const Pagination = ({
	totalItems,
	currentPage,
	basePath,
	itemsPerPage,
	searchQuery,
}: PaginationProps) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const params = new URLSearchParams(searchQuery);
	const visiblePages = getVisiblePages(totalPages, currentPage);

	return (
		<div className={styles.pagination}>
			<nav className={styles.paginationNav}>
				<Link
					href={createPageUrl(basePath, params, 1)}
					aria-disabled={currentPage === 1}
					tabIndex={currentPage === 1 ? -1 : undefined}
					className={`${styles.buttonSize} ${
						currentPage === 1 ? styles.buttonDisabled : styles.buttonActive
					}`}
				>
					&laquo;
				</Link>
				<Link
					href={createPageUrl(basePath, params, currentPage - 1)}
					aria-disabled={currentPage === 1}
					tabIndex={currentPage === 1 ? -1 : undefined}
					className={`${styles.buttonSize} ${
						currentPage === 1 ? styles.buttonDisabled : styles.buttonActive
					}`}
				>
					&lsaquo;
				</Link>

				{visiblePages.map((page, index) => {
					if (page === "...") {
						return (
							<span
								key={`ellipsis-${index}`}
								className={`${styles.buttonSize} ${styles.ellipsis}`}
							>
								...
							</span>
						);
					}
					return (
						<Link
							key={page}
							href={createPageUrl(basePath, params, page as number)}
							className={`${styles.buttonSize} ${styles.pageButton} ${
								currentPage === page
									? styles.pageButtonActive
									: styles.pageButtonInactive
							}`}
						>
							{page}
						</Link>
					);
				})}

				<Link
					href={createPageUrl(basePath, params, currentPage + 1)}
					aria-disabled={currentPage === totalPages}
					tabIndex={currentPage === totalPages ? -1 : undefined}
					className={`${styles.buttonSize} ${
						currentPage === totalPages
							? styles.buttonDisabled
							: styles.buttonActive
					}`}
				>
					&rsaquo;
				</Link>

				<Link
					href={createPageUrl(basePath, params, totalPages)}
					aria-disabled={currentPage === totalPages}
					tabIndex={currentPage === totalPages ? -1 : undefined}
					className={`${styles.buttonSize} ${
						currentPage === totalPages
							? styles.buttonDisabled
							: styles.buttonActive
					}`}
				>
					&raquo;
				</Link>
			</nav>
		</div>
	);
};

export default Pagination;

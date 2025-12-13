"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Suspense } from "react";
import iconToRight from "/public/icons-products/icon-arrow-right.svg";
import { TRANSLATIONS } from "../../utils/translations";
import styles from "./Breadcrumbs.module.css";

function BreadcrumbsContent() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	if (pathname === "/" || pathname === "/search") return null;

	const pathSegments = pathname.split("/").filter((segment) => segment !== "");
	const productDesc = searchParams.get("desc");

	const breadcrumbs = pathSegments.map((segment, index) => {
		const href = "/" + pathSegments.slice(0, index + 1).join("/");

		let label = TRANSLATIONS[segment] || segment;

		if (
			index === pathSegments.length - 1 &&
			productDesc &&
			pathSegments.includes("catalog") &&
			pathSegments.length >= 3
		) {
			label = productDesc;
		}

		return {
			label,
			href:
				index === pathSegments.length - 1
					? `${href}?desc=${productDesc}`
					: href,
			isLast: index === pathSegments.length - 1,
		};
	});

	breadcrumbs.unshift({
		label: "Главная",
		href: "/",
		isLast: false,
	});

	const getItemClass = (isLast: boolean) => {
		return isLast ? styles.lastItem : styles.linkItem;
	};

	return (
		<nav className={styles.breadcrumbs}>
			<ol className={styles.list}>
				{breadcrumbs.map((item, index) => (
					<li key={index} className={styles.listItem}>
						<div className={getItemClass(item.isLast)}>
							{item.isLast ? (
								item.label
							) : (
								<Link href={item.href} className={styles.link}>
									{item.label}
								</Link>
							)}
						</div>
						{!item.isLast && (
							<Image
								src={iconToRight}
								alt={`Переход от ${item.label} к ${
									breadcrumbs[breadcrumbs.length - 1].label
								}`}
								width={24}
								height={24}
								sizes="24px"
								className={styles.icon}
							/>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
}

const Breadcrumbs = () => {
	return (
		<Suspense
			fallback={
				<nav className={styles.skeletonContainer}>
					<div className={styles.skeletonItem}>
						<div className={styles.skeletonText}></div>
					</div>
				</nav>
			}
		>
			<BreadcrumbsContent />
		</Suspense>
	);
};

export default Breadcrumbs;

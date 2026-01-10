"use client";

import { useState, useEffect, useRef } from "react";
import { SidebarContentProps } from "../types/sidebar.types";
import SidebarHeader from "./SidebarHeader";
import CategoriesList from "./CategoriesList";
import styles from "./SidebarContent.module.css";

export default function SidebarContent({
	isOpen,
	onCloseAction,
	categories,
}: SidebarContentProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const sidebarRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				onCloseAction();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.body.style.overflow = "unset";
		};
	}, [isOpen, onCloseAction]);

	const filteredCategories = categories.filter(
		(category) =>
			category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			category.description?.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div
			ref={sidebarRef}
			className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
		>
			<SidebarHeader
				categoriesCount={categories.length}
				onClose={onCloseAction}
				searchQuery={searchQuery}
				onSearchChange={setSearchQuery}
			/>
			<div className={styles.scrollContainer}>
				<div className={styles.content}>
					<CategoriesList
						categories={filteredCategories}
						searchQuery={searchQuery}
						onItemClick={onCloseAction}
					/>
				</div>
			</div>
		</div>
	);
}

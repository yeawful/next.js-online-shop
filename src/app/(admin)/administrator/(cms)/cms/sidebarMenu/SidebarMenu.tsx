"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Truck } from "lucide-react";
import { MenuOverlay } from "./MenuOverlay";
import { MenuHeader } from "./MenuHeader";
import { MenuItemsList } from "./MenuItemsList";
import { MenuFooter } from "./MenuFooter";
import { menuItems } from "../utils/menuItems";
import { GlobalStyles } from "./GlobalStyles";
import { SidebarMenuProps } from "../types/sidebar";
import styles from "./SidebarMenu.module.css";

export const SidebarMenu = ({ isOpen, onCloseAction }: SidebarMenuProps) => {
	const router = useRouter();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setMounted(true);
	}, []);

	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOpen) {
				onCloseAction();
			}
		};

		document.addEventListener("keydown", handleEsc);

		return () => document.removeEventListener("keydown", handleEsc);
	}, [isOpen, onCloseAction]);

	useEffect(() => {
		if (!mounted) return;

		if (isOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}

		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [isOpen, mounted]);

	const handleItemClick = (path: string) => {
		router.push(path);
		onCloseAction();
	};

	if (!mounted) return null;

	const containerClass = isOpen
		? `${styles.container} ${styles.containerOpen}`
		: `${styles.container} ${styles.containerClosed}`;

	return (
		<>
			<GlobalStyles />
			<MenuOverlay isOpen={isOpen} onClose={onCloseAction} />

			<div className={containerClass}>
				<div className={styles.leftAccent} />
				<div className={styles.leftAccentSecondary} />

				<div className="relative h-full w-full">
					<div className={styles.backgroundBase} />
					<div className={styles.backgroundGradient} />
					<div className={styles.backgroundShadow} />
					<div className={styles.content}>
						<div className={styles.headerContainer}>
							<MenuHeader
								isOpen={isOpen}
								onCloseAction={onCloseAction}
								icon={<Truck className="relative w-7 h-7 text-blue-600" />}
							/>
						</div>
						<div className={styles.menuContainer}>
							<MenuItemsList items={menuItems} onItemClick={handleItemClick} />
						</div>

						<MenuFooter />
					</div>
				</div>
			</div>
		</>
	);
};

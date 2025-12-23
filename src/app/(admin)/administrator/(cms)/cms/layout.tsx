"use client";

import { Menu } from "lucide-react";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import { SidebarMenu } from "./sidebarMenu/SidebarMenu";
import styles from "./layout.module.css";

export default function CMSLayout({ children }: { children: ReactNode }) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const pathname = usePathname();

	const isCMSRoot = pathname === "/administrator/cms";

	return (
		<>
			{!isCMSRoot && (
				<button
					onClick={() => setIsSidebarOpen(true)}
					className={styles.sidebarButton}
					aria-label="Открыть меню"
				>
					<Menu className={styles.buttonIcon} />
				</button>
			)}
			<main className={styles.main}>{children}</main>
			<SidebarMenu
				isOpen={isSidebarOpen}
				onCloseAction={() => setIsSidebarOpen(false)}
			/>
		</>
	);
}

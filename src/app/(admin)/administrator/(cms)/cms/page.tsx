"use client";

import { useState, useEffect } from "react";
import Header from "./_components/Header";
import DashboardCardsGrid from "./_components/DashboardCardsGrid";
import StatsSection from "./_components/StatsSection";
import styles from "./page.module.css";

const AdminDashboardPage = () => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setMounted(true);
	}, []);

	if (!mounted) return null;

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<Header
					title="Административная панель"
					description="Управление контентом и SEO блога"
				/>
				<DashboardCardsGrid />
				<StatsSection />
			</div>
		</div>
	);
};

export default AdminDashboardPage;

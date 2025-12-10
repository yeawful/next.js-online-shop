import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "@a1rth/css-normalize";
import "./globals.css";
import Header from "@/components/header/Header/Header";
import Footer from "@/components/footer/Footer";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import { RegFormProvider } from "./contexts/RegFormContext";
import AuthProvider from "@/store/AuthProvider";

const rubik = Rubik({
	variable: "--font-rubik",
	subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
	),
	title: "Северяночка",
	description: "Доставка и покупка продуктов питания",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body className={`${rubik.variable} font-sans`}>
				<AuthProvider>
					<RegFormProvider>
						<Header />
						<Breadcrumbs />
						{children}
						<Footer />
					</RegFormProvider>
				</AuthProvider>
			</body>
		</html>
	);
}

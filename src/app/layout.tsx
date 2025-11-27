import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "@a1rth/css-normalize";
import "./globals.css";
import Header from "@/components/header/Header/Header";
import Footer from "@/components/footer/Footer";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import { RegFormProvider } from "./contexts/RegFormContext";

const rubik = Rubik({
	variable: "--font-rubik",
	subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
	title: "Северяночка",
	description: "Доставка и покупка продуктов питания",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${rubik.variable} font-sans`}>
				<RegFormProvider>
					<Header />
					<Breadcrumbs />
					{children}
					<Footer />
				</RegFormProvider>
			</body>
		</html>
	);
}

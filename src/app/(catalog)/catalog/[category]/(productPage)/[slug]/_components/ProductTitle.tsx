"use client";

import { useProduct } from "@/app/contexts/ProductContext";
import { useEffect } from "react";
import styles from "./ProductTitle.module.css";

interface ProductTitleProps {
	title: string;
	description: string;
}

const ProductTitle = ({ title, description }: ProductTitleProps) => {
	const { setTitle } = useProduct();
	useEffect(() => {
		setTitle(title);
	}, [title, setTitle]);
	return <h1 className={styles.title}>{description}</h1>;
};

export default ProductTitle;

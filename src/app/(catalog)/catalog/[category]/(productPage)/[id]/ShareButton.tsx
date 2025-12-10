"use client";

import { useState, useEffect } from "react";
import {
	TelegramShareButton,
	VKShareButton,
	WhatsappShareButton,
	TelegramIcon,
	VKIcon,
	WhatsappIcon,
} from "react-share";
import Image from "next/image";
import styles from "./ShareButton.module.css";

interface ShareButtonProps {
	title: string;
	className?: string;
}

const ShareButton = ({ title, className = "" }: ShareButtonProps) => {
	const [showShareMenu, setShowShareMenu] = useState(false);
	const [currentUrl, setCurrentUrl] = useState("");

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setCurrentUrl(window.location.href);
	}, []);

	const handleClickOutside = (e: React.MouseEvent) => {
		e.stopPropagation();
		setShowShareMenu(false);
	};

	return (
		<div className={`${styles.container} ${className}`}>
			<div
				className={styles.button}
				onClick={(e) => {
					e.stopPropagation();
					setShowShareMenu(!showShareMenu);
				}}
			>
				<Image
					src="/icons-products/icon-share.svg"
					alt="Поделиться"
					width={24}
					height={24}
				/>
				<p className={styles.text}>Поделиться</p>
			</div>

			{showShareMenu && currentUrl && (
				<>
					<div className={styles.overlay} onClick={handleClickOutside} />
					<div className={styles.shareMenu}>
						<div className={styles.shareButtons}>
							<TelegramShareButton
								url={currentUrl}
								title={title}
								className={styles.shareButton}
							>
								<TelegramIcon size={32} round />
							</TelegramShareButton>

							<VKShareButton
								url={currentUrl}
								title={title}
								className={styles.shareButton}
							>
								<VKIcon size={32} round />
							</VKShareButton>

							<WhatsappShareButton
								url={currentUrl}
								title={title}
								className={styles.shareButton}
							>
								<WhatsappIcon size={32} round />
							</WhatsappShareButton>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ShareButton;

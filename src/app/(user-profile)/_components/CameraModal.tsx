"use client";

import Image from "next/image";
import styles from "./CameraModal.module.css";

interface CameraModalProps {
	isOpen: boolean;
	isCameraReady: boolean;
	isUploading: boolean;
	videoRef: React.RefObject<HTMLVideoElement | null>;
	canvasRef: React.RefObject<HTMLCanvasElement | null>;
	onClose: () => void;
	onVideoLoaded: () => void;
	onTakePhoto: () => void;
}

const CameraModal = ({
	isOpen,
	isCameraReady,
	isUploading,
	videoRef,
	canvasRef,
	onClose,
	onVideoLoaded,
	onTakePhoto,
}: CameraModalProps) => {
	if (!isOpen) return null;

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContent}>
				<h3 className={styles.modalTitle}>Сделайте фото</h3>

				<div className={styles.videoContainer}>
					<video
						ref={videoRef}
						autoPlay
						playsInline
						muted
						onLoadedData={onVideoLoaded}
						className={styles.video}
					/>
					{!isCameraReady && (
						<div className={styles.spinner}>
							<div className={styles.spinnerIcon}></div>
						</div>
					)}
				</div>

				{/* canvas используется для "фотографирования" текущего кадра видео */}
				<canvas ref={canvasRef} className={styles.hiddenCanvas} />

				<div className={styles.buttonsContainer}>
					<button
						onClick={onTakePhoto}
						disabled={!isCameraReady || isUploading}
						className={styles.captureButton}
					>
						<div className={styles.captureButtonContent}>
							<Image
								src="/icons-auth/icon-camera.png"
								alt="Фото"
								width={24}
								height={24}
							/>
							{isCameraReady ? " Снять фото" : "Загрузка..."}
						</div>
					</button>
					<button
						onClick={onClose}
						disabled={isUploading}
						className={styles.cancelButton}
					>
						Отмена
					</button>
				</div>

				{!isCameraReady && (
					<p className={styles.loadingText}>Камера запускается...</p>
				)}
			</div>
		</div>
	);
};

export default CameraModal;

import styles from "./HighlightText.module.css";

export default function HighlightText({
	text,
	highlight,
}: {
	text: string;
	highlight: string;
}) {
	if (!highlight.trim()) return <>{text}</>;
	const parts = text.split(new RegExp(`(${highlight})`, "gi"));

	return (
		<span>
			{parts.map((part, i) =>
				part.toLowerCase() === highlight.toLowerCase() ? (
					<span key={i} className={styles.highlightedText}>
						{part}
					</span>
				) : (
					part
				)
			)}
		</span>
	);
}

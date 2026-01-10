import styles from "./CategoryNewBadge.module.css";

export default function CategoryNewBadge({ createdAt }: { createdAt: string }) {
	const createdDate = new Date(createdAt);
	const monthAgo = new Date();
	monthAgo.setMonth(monthAgo.getMonth() - 1);

	if (createdDate > monthAgo) {
		return <div className={styles.badge}>Новое</div>;
	}

	return null;
}

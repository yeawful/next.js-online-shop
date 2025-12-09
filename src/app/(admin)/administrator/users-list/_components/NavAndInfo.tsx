import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { tableStyles } from "../../styles";
import styles from "./NavAndInfo.module.css";

interface NavAndInfoProps {
	pageSize: number;
	pageSizeOptions: number[];
	onPageSizeChange: (size: number) => void;
	totalUsers: number;
}

const NavAndInfo = ({
	pageSize,
	pageSizeOptions,
	onPageSizeChange,
	totalUsers,
}: NavAndInfoProps) => {
	return (
		<div className={`${tableStyles.spacing.section} ${styles.section}`}>
			<Link href="/administrator" className={styles.backLink}>
				<ArrowLeft className={styles.backIcon} />
				Назад в панель управления
			</Link>

			<div className={styles.contentContainer}>
				<div>
					<h1 className={styles.title}>Список пользователей</h1>
					<p className={styles.totalUsers}>Всего пользователей: {totalUsers}</p>
				</div>

				<div className={styles.selectorContainer}>
					<label htmlFor="pageSize" className={styles.selectorLabel}>
						Пользователей на странице:
					</label>
					<select
						id="pageSize"
						value={pageSize}
						onChange={(e) => onPageSizeChange(Number(e.target.value))}
						className={styles.selector}
					>
						{pageSizeOptions.map((option) => (
							<option key={option} value={option}>
								{option}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
};

export default NavAndInfo;

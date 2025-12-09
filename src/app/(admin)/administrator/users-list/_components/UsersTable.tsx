import { UserData } from "@/types/userData";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import Pagination from "./Pagination";
import styles from "./UsersTable.module.css";

interface UsersTableProps {
	users: UserData[];
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	sortBy: string;
	sortDirection: "asc" | "desc";
	onSort: (field: string, direction: "asc" | "desc") => void;
}
const UsersTable = ({
	users,
	currentPage,
	totalPages,
	onPageChange,
	sortBy,
	sortDirection,
	onSort,
}: UsersTableProps) => {
	return (
		<div className={styles.container}>
			<TableHeader
				sortBy={sortBy}
				sortDirection={sortDirection}
				onSort={onSort}
			/>
			<div className={styles.usersList}>
				{users.map((user) => (
					<TableRow key={user.id} user={user} />
				))}
			</div>
			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				onPageChange={onPageChange}
			/>
		</div>
	);
};

export default UsersTable;

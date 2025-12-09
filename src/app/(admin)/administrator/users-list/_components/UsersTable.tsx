import { UserData } from "@/types/userData";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";
import { getShortDecimalId } from "../../../../../utils/admin/shortDecimalId";
import { calculateAge } from "../../../../../utils/admin/calculateAge";
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
	// currentPage,
	// totalPages,
	// onPageChange,
	sortBy,
	sortDirection,
	onSort,
}: UsersTableProps) => {
	let sortedUsers = users;

	if (sortBy === "id") {
		sortedUsers = [...users].sort((a, b) => {
			const decimalA = parseInt(getShortDecimalId(a.id));
			const decimalB = parseInt(getShortDecimalId(b.id));

			return sortDirection === "asc"
				? decimalA - decimalB
				: decimalB - decimalA;
		});
	}

	if (sortBy === "age") {
		sortedUsers = [...users].sort((a, b) => {
			const ageA = parseInt(calculateAge(a.birthdayDate).toString());
			const ageB = parseInt(calculateAge(b.birthdayDate).toString());

			return sortDirection === "asc" ? ageA - ageB : ageB - ageA;
		});
	}

	return (
		<div className={styles.container}>
			<TableHeader
				sortBy={sortBy}
				sortDirection={sortDirection}
				onSort={onSort}
			/>
			<div className={styles.usersList}>
				{sortedUsers.map((user) => (
					<TableRow key={user.id} user={user} />
				))}
			</div>
		</div>
	);
};

export default UsersTable;

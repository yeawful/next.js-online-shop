"use client";

import { UserData } from "@/types/userData";
import UserId from "./UserId";
import Person from "./Person";
import Age from "./Age";
import Email from "./Email";
import Phone from "./Phone";
import Role from "./Role";
import Register from "./Register";
import styles from "./TableRow.module.css";

interface TableRowProps {
	user: UserData;
}

const TableRow = ({ user }: TableRowProps) => {
	return (
		<div className={styles.container}>
			<UserId userId={user.id} />
			<Person
				name={user.name}
				surname={user.surname}
				birthday={user.birthdayDate}
			/>
			<Age birthdayDate={user.birthdayDate} />
			<Email email={user.email} emailVerified={user.emailVerified} />
			<Phone
				phone={user.phoneNumber}
				phoneVerified={user.phoneNumberVerified}
			/>
			<Role initialRole={user.role} userId={user.id} />
			<Register createdAt={user.createdAt} />
		</div>
	);
};

export default TableRow;

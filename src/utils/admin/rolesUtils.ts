import { UserRole } from "@/types/userData";
import { tableStyles } from "@/app/(admin)/administrator/styles";

export const getRoleStyles = (role: UserRole): string => {
	switch (role) {
		case "admin":
			return tableStyles.utils.roleAdmin;
		case "manager":
			return tableStyles.utils.roleManager;
		default:
			return tableStyles.utils.roleUser;
	}
};

export const getRoleLabel = (role: UserRole): string => {
	switch (role) {
		case "admin":
			return "Администратор";
		case "manager":
			return "Менеджер";
		default:
			return "Пользователь";
	}
};

"use client";

import { useState, useEffect } from "react";
import { tableStyles } from "../../styles";
import MiniLoader from "@/components/loaders/MiniLoader";
import { UserRole } from "@/types/userData";
import { useAuthStore } from "@/store/authStore";
import {
	getRoleLabel,
	getRoleStyles,
} from "../../../../../utils/admin/rolesUtils";
import styles from "./Role.module.css";

interface RoleProps {
	initialRole: string;
	userId: string;
}

const Role = ({ initialRole, userId }: RoleProps) => {
	const [isChanging, setIsChanging] = useState(false);
	const [localRole, setLocalRole] = useState<UserRole>(initialRole as UserRole);
	const { user: currentUser } = useAuthStore();

	const isAdmin = currentUser?.role === "admin";
	const canChangeRole = isAdmin;

	useEffect(() => {
		setLocalRole(initialRole as UserRole);
	}, [initialRole]);

	const handleRoleChange = async (newRole: UserRole) => {
		if (newRole === localRole || !canChangeRole) return;

		setIsChanging(true);
		try {
			const response = await fetch(`/api/admin/users/${userId}/role`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ role: newRole }),
			});

			if (!response.ok) {
				throw new Error("Ошибка при обновлении роли");
			}

			const data = await response.json();

			if (data.success) {
				setLocalRole(newRole);
			} else {
				throw new Error(data.error || "Неизвестная ошибка");
			}
		} catch (error) {
			console.error("Ошибка при обновлении роли:", error);
			setLocalRole(initialRole as UserRole);
		} finally {
			setIsChanging(false);
		}
	};

	return (
		<div
			className={`${tableStyles.colSpans.role} ${tableStyles.border.right} ${styles.container}`}
		>
			<div className={styles.label}>Роль:</div>

			{isChanging ? (
				<div className={styles.loadingText}>
					<MiniLoader />
				</div>
			) : localRole === "admin" ? (
				<div className={`${styles.roleBadge} ${getRoleStyles(localRole)}`}>
					{getRoleLabel(localRole)}
				</div>
			) : canChangeRole ? (
				<select
					value={localRole}
					onChange={(e) => handleRoleChange(e.target.value as UserRole)}
					className={`${styles.roleSelect} ${getRoleStyles(localRole)}`}
					disabled={isChanging}
				>
					<option value="user">Пользователь</option>
					<option value="manager">Менеджер</option>
				</select>
			) : (
				<div className={`${styles.roleBadge} ${getRoleStyles(localRole)}`}>
					{getRoleLabel(localRole)}
				</div>
			)}
		</div>
	);
};

export default Role;

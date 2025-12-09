"use client";

import { FiltersState } from "@/types/filtersState";
import styles from "./Filters.module.css";

interface FiltersProps {
	filters: FiltersState;
	onFilterChange: (filters: FiltersState) => void;
	onClearFilters: () => void;
	onApplyFilters: () => void;
}

const Filters = ({
	filters,
	onFilterChange,
	onClearFilters,
	onApplyFilters,
}: FiltersProps) => {
	const handleInputChange = (field: keyof FiltersState, value: string) => {
		onFilterChange({
			...filters,
			[field]: value,
		});
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h3 className={styles.title}>Фильтры</h3>
				<div className={styles.buttonsContainer}>
					<button onClick={onApplyFilters} className={styles.applyButton}>
						Найти
					</button>
					<button onClick={onClearFilters} className={styles.clearButton}>
						Очистить
					</button>
				</div>
			</div>

			<div className={styles.formGrid}>
				<div className={styles.field}>
					<label className={styles.label}>ID</label>
					<input
						type="text"
						value={filters.id}
						onChange={(e) => handleInputChange("id", e.target.value)}
						placeholder="Поиск по ID"
						className={styles.input}
					/>
				</div>

				<div className={styles.field}>
					<label className={styles.label}>Имя</label>
					<input
						type="text"
						value={filters.name}
						onChange={(e) => handleInputChange("name", e.target.value)}
						placeholder="Поиск по имени"
						className={styles.input}
					/>
				</div>

				<div className={styles.field}>
					<label className={styles.label}>Фамилия</label>
					<input
						type="text"
						value={filters.surname}
						onChange={(e) => handleInputChange("surname", e.target.value)}
						placeholder="Поиск по фамилии"
						className={styles.input}
					/>
				</div>

				<div className={styles.field}>
					<label className={styles.label}>Email</label>
					<input
						type="email"
						value={filters.email}
						onChange={(e) => handleInputChange("email", e.target.value)}
						placeholder="Поиск по email"
						className={styles.input}
					/>
				</div>

				<div className={styles.field}>
					<label className={styles.label}>Телефон</label>
					<input
						type="tel"
						value={filters.phoneNumber}
						onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
						placeholder="Поиск по телефону"
						className={styles.input}
					/>
				</div>

				<div className={styles.field}>
					<label className={styles.label}>Роль</label>
					<select
						value={filters.role}
						onChange={(e) => handleInputChange("role", e.target.value)}
						className={styles.select}
					>
						<option value="">Все роли</option>
						<option value="user">Пользователь</option>
						<option value="manager">Менеджер</option>
					</select>
				</div>

				<div className={styles.field}>
					<label className={styles.label}>Возраст от</label>
					<input
						type="number"
						value={filters.minAge}
						onChange={(e) => handleInputChange("minAge", e.target.value)}
						min="0"
						placeholder="От"
						className={styles.input}
					/>
				</div>

				<div className={styles.field}>
					<label className={styles.label}>Возраст до</label>
					<input
						type="number"
						value={filters.maxAge}
						onChange={(e) => handleInputChange("maxAge", e.target.value)}
						min="0"
						placeholder="До"
						className={styles.input}
					/>
				</div>

				<div className={styles.field}>
					<label className={styles.label}>Регистрация от</label>
					<input
						type="date"
						value={filters.startDate}
						onChange={(e) => handleInputChange("startDate", e.target.value)}
						className={styles.input}
					/>
				</div>

				<div className={styles.field}>
					<label className={styles.label}>Регистрация до</label>
					<input
						type="date"
						value={filters.endDate}
						onChange={(e) => handleInputChange("endDate", e.target.value)}
						className={styles.input}
					/>
				</div>
			</div>
		</div>
	);
};

export default Filters;

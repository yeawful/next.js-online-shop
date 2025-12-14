import styles from "./CartControls.module.css";

interface CartControlsProps {
	isAllSelected: boolean;
	selectedItemsCount: number;
	onSelectAll: () => void;
	onDeselectAll: () => void;
	onRemoveSelected: () => void;
}

const CartControls = ({
	isAllSelected,
	selectedItemsCount,
	onSelectAll,
	onDeselectAll,
	onRemoveSelected,
}: CartControlsProps) => {
	return (
		<div className={styles.container}>
			<label className={styles.checkboxLabel}>
				<input
					type="checkbox"
					checked={isAllSelected}
					onChange={(e) => (e.target.checked ? onSelectAll() : onDeselectAll())}
					className={styles.checkboxInput}
				/>
				<div className={styles.checkbox}>
					{isAllSelected ? (
						<div className={styles.minusIcon}></div>
					) : (
						<div className={styles.plusIcon}>
							<div className={styles.plusIconHorizontal}></div>
							<div className={styles.plusIconVertical}></div>
						</div>
					)}
				</div>
				<span className={styles.labelText}>Выделить все</span>
			</label>

			{selectedItemsCount > 0 && (
				<button onClick={onRemoveSelected} className={styles.removeButton}>
					Удалить выбранные
				</button>
			)}
		</div>
	);
};

export default CartControls;

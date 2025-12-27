"use client";

import IconVision from "@/components/ui/svg/IconVision";
import { ChangeEvent } from "react";
import Tooltip from "@/components/ui/Tooltip";
import { isPasswordValid } from "../../../utils/validation/passwordValid";
import styles from "./PasswordInput.module.css";

interface PasswordInputProps {
	id: string;
	label: string;
	value: string;
	onChangeAction: (e: ChangeEvent<HTMLInputElement>) => void;
	showPassword: boolean;
	togglePasswordVisibilityAction: () => void;
	showRequirements?: boolean;
	compareWith?: string;
	inputClass?: string;
}

const PasswordInput = ({
	id,
	label,
	value,
	onChangeAction,
	togglePasswordVisibilityAction,
	showPassword,
	showRequirements,
	compareWith,
	inputClass = "",
}: PasswordInputProps) => {
	const shouldShowTooltip = () => {
		if (showRequirements) {
			return value.length > 0 && !isPasswordValid(value);
		}

		if (compareWith) {
			return (
				value.length > 0 && compareWith.length > 0 && value !== compareWith
			);
		}
		return false;
	};

	const getTooltipText = () => {
		if (showRequirements) {
			return "Пароль должен содержать: 6+ символов на латинице и цифры";
		}

		return "Пароли пока не совпадают";
	};

	return (
		<div className={styles.passwordContainer}>
			<label htmlFor={id} className={styles.label}>
				{label}
			</label>
			<div className={styles.inputContainer}>
				<input
					id={id}
					type={showPassword ? "text" : "password"}
					value={value}
					onChange={onChangeAction}
					className={`${styles.input} ${inputClass}`}
					autoComplete="off"
					readOnly
					onFocus={(e) => e.target.removeAttribute("readonly")}
				/>
				<button
					type="button"
					onClick={togglePasswordVisibilityAction}
					className={styles.toggleButton}
				>
					<IconVision showPassword={showPassword} />
				</button>
			</div>
			{shouldShowTooltip() && <Tooltip text={getTooltipText()} />}
		</div>
	);
};

export default PasswordInput;

import ButtonSearch from "../ButtonSearch/ButtonSearch";
import InputBlock from "../InputBlock/InputBlock";
import styles from "./SearchBlock.module.css";

const SearchBlock = ({
	onFocusChangeAction,
}: {
	onFocusChangeAction: (focused: boolean) => void;
}) => {
	return (
		<div className={styles.container}>
			<ButtonSearch />
			<InputBlock onFocusChangeAction={onFocusChangeAction} />
		</div>
	);
};

export default SearchBlock;

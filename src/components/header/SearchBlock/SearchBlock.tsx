import ButtonSearch from "../ButtonSearch/ButtonSearch";
import InputBlock from "../InputBlock/InputBlock";
import styles from "./SearchBlock.module.css";

const SearchBlock = () => {
	return (
		<div className={styles.container}>
			<ButtonSearch />
			<InputBlock />
		</div>
	);
};

export default SearchBlock;

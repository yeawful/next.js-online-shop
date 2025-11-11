import Image from "next/image";
import iconSearch from "/public/icons-header/icon-search.svg";
import styles from "./InputBlock.module.css";

const InputBlock = () => {
	return (
		<div className={styles.container}>
			<input type="text" placeholder="Найти товар" className={styles.input} />
			<button type="button" className={styles.searchButton}>
				<Image src={iconSearch} alt="Поиск" width={24} height={24} />
			</button>
		</div>
	);
};

export default InputBlock;


import TextRow from "./TextRow";
import styles from './wordle.module.css';

export default function WordlePage() {
    return <div className={styles.container}>
        <h1> Wordle Page</h1>
        <TextRow />
    </div>;
}
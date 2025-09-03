import TicTacToe from "./TicTacToe";
import styles from "./TicTacToe.module.css";

export default function TicTacToePage() {
    return (
        <div className={styles.pageContainer}>
            <TicTacToe />
        </div>
    );
}
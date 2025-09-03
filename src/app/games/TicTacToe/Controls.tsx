import styles from "./TicTacToe.module.css";

interface ControlsProps {
  onReset: () => void;
}

export default function Controls({onReset}: ControlsProps) {
    return <div className={styles.controls}>
        <button onClick={onReset} className={styles.resetButton}>Reset Game</button>
    </div>
}
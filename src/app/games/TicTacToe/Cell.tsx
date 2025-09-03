import styles from "./TicTacToe.module.css";

interface CellProps  {
    value: 'X' | 'O' | null;
    onClick: () => void;
}

export default function Cell({ value, onClick }: CellProps) {
    const button_text = value ? value : '';

    let cellClass = styles.cell;
    if (value === "X") cellClass += " " + styles.x;
    if (value === "O") cellClass += " " + styles.o;

    return (
        <button
            onClick={onClick}
            className={cellClass}
            disabled={!!value}
        >
            {button_text}
        </button>
    );
}
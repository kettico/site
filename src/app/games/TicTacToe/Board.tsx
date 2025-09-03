import Cell from "./Cell";
import styles from "./TicTacToe.module.css";

interface BoardProps {
    cells: (null | 'X' | 'O')[];
    onCellClick: (index: number) => void;
}

export default function Board({ cells, onCellClick } : BoardProps) {
    return (
        <div className={styles.board}>
            {cells.map((value, idx) => (
                <Cell
                    key={idx}
                    value={value}
                    onClick={() => onCellClick(idx)}
                />
            ))}
        </div>
    );
}
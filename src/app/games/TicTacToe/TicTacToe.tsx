'use client';
import Board from "./Board";
import Controls from "./Controls";
import Status from "./Status";
import styles from "./TicTacToe.module.css";
import { useState } from "react";

export default function TicTacToe() {
    const [cells, setCells] = useState<(null | 'X' | 'O')[]>(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);

    const onCellClick = (index: number) => {
        if (cells[index]) return;
        const nextCells = cells.slice();
        nextCells[index] = xIsNext ? 'X' : 'O';
        setCells(nextCells);
        setXIsNext(!xIsNext);
    };

    const onReset = () => {
        setCells(Array(9).fill(null));
        setXIsNext(true);
    }

    return (
        <div className={styles.pageContainer}>
            <h1 className={styles.title}>Tic Tac Toe</h1>
            <div className={styles.statusControlsRow}>
                <Status cells={cells} xIsNext={xIsNext} />
                <Controls onReset={onReset}/>
            </div>
            
            <Board cells={cells} onCellClick={onCellClick} />
        </div>
    );
}
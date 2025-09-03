'use client';
import { useState } from "react";
import Board from "./Board";
import styles from "./sudoku.module.css";

export default function Sudoku() {
    const [cells, setCells] = useState<('' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9')[]>(Array(81).fill(''));
    const onCellChanged = (row: number, col: number) => {
        // Handle cell change logic here
    }

    return  <div className={styles.container}>
                <Board cells={cells} onCellChanged={onCellChanged}/>
            </div>
}


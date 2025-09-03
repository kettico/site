'use client';
import { useState } from "react";
import Cell from "./Cell";
import styles from "./sudoku.module.css";

interface BoardProps {
    cells: ('' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9')[];
    onCellChanged: (row: number, col: number) => void;
}

export default function Board({}: BoardProps) {
    const [cells, setCells] = useState<('' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9')[]>(Array(81).fill(''));
    const onCellChanged = (row: number, col: number) => {
        // Handle cell click logic here
    };
    
    return  <div className={styles.board}>
                {cells.map((value, idx) => (
                    <Cell
                        key={idx}
                        value={value}
                    />
                ))}
            </div>
}
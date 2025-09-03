'use client';
import { useState } from "react";
import styles from "./Minesweeper.module.css";
import Board from "./Board";

export default function Minesweeper() {
    const [score, setScore] = useState(0);
    return  <div className={styles.minesweeper}> 
                <div className={styles.score}>Score: {score}</div>
                <Board rows={10} cols={10} score={score} setScore={setScore} />
            </div>
}
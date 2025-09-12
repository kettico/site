'use client';
import { useState } from "react";
import styles from "./Minesweeper.module.css";
import Board from "./Board";
import { Cell, generateBoard } from "./util";

export default function Minesweeper() {
  const [cells, setCells] = useState<Cell[][]>(() => generateBoard(10, 10, 10));
  const [score, setScore] = useState(0);

  const handleNewGame = () => {
    setCells(generateBoard(10, 10, 10));
    setScore(0);
  };

  const handleScoreChange = (points: number) => {
    setScore(prev => prev + points);
  };

  return (
    <div className={styles.minesweeper}>
      <div className={styles.score}>
        <span>Score: {score}</span>
        <button onClick={handleNewGame} className={styles.newGameButton}>
          🔄 New Game
        </button>
      </div>
      <Board cells={cells} setCells={setCells} onScoreChange={handleScoreChange} />
    </div>
  );
}
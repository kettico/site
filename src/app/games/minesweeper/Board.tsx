import { useState } from "react";
import styles from "./Minesweeper.module.css";
import {Cell, countNewReveals, floodFill, generateBoard } from "./util";
import CellComponent from "./Cell";

interface BoardProps {
  rows: number;
  cols: number;
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

export default function Board({ rows, cols, score, setScore}: BoardProps) {
  const [cells, setCells] = useState(() => generateBoard(rows, cols, 10)); //

  const onClick = (row: number, col: number) => {
    const cell = cells[row][col];
    if (cell.state === "revealed" || cell.state === "flagged") return;

    let newCells: Cell[][];

    if (cell.value === -1) {
      newCells = cells.map(r =>
        r.map(c => (c.value === -1 ? { ...c, state: "revealed" } : { ...c }))
      );
      alert("💥 Game Over!");
    } else if (cell.value === 0) {
      newCells = floodFill(cells, row, col);
      const revealedCount = countNewReveals(cells, newCells);
      setScore(prev => prev + revealedCount);
    } else {
      newCells = cells.map((r, rIdx) =>
        r.map((c, cIdx) =>
          rIdx === row && cIdx === col ? { ...c, state: "revealed" } : c
        )
      );
      setScore(prev => prev + 1);
    }
    setCells(newCells);
  };

  const onRightClick = (row: number, col: number, e: React.MouseEvent) => {
    e.preventDefault();
    setCells(prevCells =>
      prevCells.map((r, rIdx) =>
        r.map((c, cIdx) =>
          rIdx === row && cIdx === col
            ? {
                ...c,
                state: c.state === "hidden" ? "flagged" : "hidden"
              }
            : c
        )
      )
    );
  };

  return (
    <div className={styles.board}>
      {cells.map((row, rowIdx) =>
        row.map((cell, colIdx) => (
          <CellComponent
            key={`${rowIdx}-${colIdx}`}
            value={cell.value}
            state={cell.state}
            onClick={() => onClick(rowIdx, colIdx)}
            onContextMenu={e => onRightClick(rowIdx, colIdx, e)}
          />
        ))
      )}
    </div>
  );
}
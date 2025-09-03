import styles from "./TicTacToe.module.css";

interface StatusProps {
    cells: (null | 'X' | 'O')[];
    xIsNext: boolean;
    // Optionally:
    winner?: 'X' | 'O' | null;
    isDraw?: boolean;
};

export default function Status({ cells, xIsNext }: StatusProps) {
  function calculateWinner(cells: (null | 'X' | 'O')[]) {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (let line of lines) {
      const [a,b,c] = line;
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(cells);
  const isDraw = !winner && cells.every(cell => cell);

  let message;
  let statusClass = styles.status;
  if (!winner && !isDraw) {
    statusClass += ' ' + (xIsNext ? styles.xStatus : styles.oStatus);
  } else if (winner === 'X') {
    statusClass += ' ' + styles.xStatus;
  } else if (winner === 'O') {
    statusClass += ' ' + styles.oStatus;
  }

  if (winner) {
    message = `${winner} wins!`;
  } else if (isDraw) {
    message = "Draw!";
  } else {
    message = `It's ${xIsNext ? "X" : "O"}'s turn.`;
  }

  return <div className={statusClass}>{message}</div>;
}
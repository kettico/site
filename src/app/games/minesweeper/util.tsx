export interface Cell {
  value: number; // -1 for bomb, 0-8 for number of adjacent bombs
  state: "hidden" | "revealed" | "flagged";
}
export function generateBoard(rows: number, cols: number, bombCount: number): Cell[][] {
  const board: Cell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      value: 0,
      state: "hidden"
    }))
  );

  // Place bombs
  let placed = 0;
  while (placed < bombCount) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (board[r][c].value === -1) continue;
    board[r][c].value = -1;
    placed++;

    // Increment adjacent cells
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        const nr = r + dr;
        const nc = c + dc;
        if (
          nr >= 0 &&
          nr < rows &&
          nc >= 0 &&
          nc < cols &&
          board[nr][nc].value !== -1
        ) {
          board[nr][nc].value += 1;
        }
      }
    }
  }

  return board;
}

export function floodFill(board: Cell[][], row: number, col: number): Cell[][] {
  const rows = board.length;
  const cols = board[0].length;
  const newBoard = board.map(r => r.map(c => ({ ...c })));
  const stack = [[row, col]];
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],          [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];
  while (stack.length) {
    const [r, c] = stack.pop()!;
    if (newBoard[r][c].state === "revealed") continue;
    newBoard[r][c].state = "revealed";
    if (newBoard[r][c].value === 0) {
      for (let [dr, dc] of directions) {
        const nr = r + dr;
        const nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && newBoard[nr][nc].state === "hidden") {
          stack.push([nr, nc]);
        }
      }
    }
  }
  return newBoard;
}

export function countNewReveals(oldBoard: Cell[][], newBoard: Cell[][]): number {
  let count = 0;
  for (let r = 0; r < oldBoard.length; r++) {
    for (let c = 0; c < oldBoard[0].length; c++) {
      if (
        oldBoard[r][c].state !== "revealed" &&
        newBoard[r][c].state === "revealed"
      ) {
        count++;
      }
    }
  }
  return count;
}
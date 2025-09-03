import Link from "next/link";

export default function GamesPage() {
    return <div>
        <h1> Games </h1>
        <Link href="/games/TicTacToe"> Tic Tac Toe </Link>
        <Link href="/games/sudoku"> Sudoku </Link>
    </div>
}
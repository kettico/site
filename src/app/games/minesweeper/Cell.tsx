import styles from "./Minesweeper.module.css";



interface CellProps {
  value: number;
  state: string;
  onClick: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
}

export default function CellComponent({ value, state, onClick, onContextMenu }: CellProps) {
    let text = "";
    switch(state){
        case "flagged":
            text = "🚩";
            break;
        case "revealed":
            text = value === -1 ? "💣" : value === 0 ? "" : value.toString();
            break;
    }
    const className = `${styles.cell} ${styles[state]}`;

    return (
    <button
        className={className}
        onClick={onClick}
        onContextMenu={onContextMenu}
    >
        {text}
    </button>
    );
}
import style from "./sudoku.module.css";

interface CellProps {
    value: string;
}   

export default function Cell({ value }: CellProps) {
    const text = value === ' ' ? '' : value;
    return <input type="text" maxLength={1} defaultValue={value} className={style.cell} />;
}
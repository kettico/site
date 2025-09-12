'use client';
import { useRef, useEffect } from "react";
import styles from './wordle.module.css';

interface TextCellProps {
    letter: string;
    idx: number;
    onChange: (char: string, idx: number) => void;
}

export default function TextCell({letter, idx, onChange}: TextCellProps) {

    return (
        <input
            className={styles.textCell}
            type="text"
            maxLength={1}
            value={letter}
            onChange={(e) => onChange(e.target.value, idx)}
        />
    )

}
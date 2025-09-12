'use client';

import styles from './wordle.module.css';
import TextCell from "./TextCell";
import { useState } from 'react';

export default function TextRow() {
    const [letters, setLetters] = useState(['A', '', '', '', '']);
    
    const onChange = (char: string, idx: number) => {
        const updated = [...letters];
        updated[idx] = char.toUpperCase(); // Optional: force uppercase
        setLetters(updated);    
    };


    return  (
    <div className={styles.grid}>
            <TextCell letter={letters[0]} idx={0} onChange={onChange}/>
            <TextCell letter={letters[1]} idx={1} onChange={onChange}/>
            <TextCell letter={letters[2]} idx={2} onChange={onChange}/>
            <TextCell letter={letters[3]} idx={3} onChange={onChange}/>
            <TextCell letter={letters[4]} idx={4} onChange={onChange}/>
            <button>Submit</button>
    </div>
    );
}
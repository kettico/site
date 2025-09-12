'use client';
import styles from './room.module.css';

interface MessageBoxProps {
    text: string;
    sender: string;
}

export default function MessageBox({text, sender}: MessageBoxProps) {
    return (
        <div>
            <strong className={styles.sender}>{sender}:</strong>
            <p className={styles.text}> {text}</p>
        </div>)
}

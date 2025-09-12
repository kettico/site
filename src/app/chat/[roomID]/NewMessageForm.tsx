'use client';
import { useState } from "react";
import styles from './room.module.css';

export default function NewMessageForm({ onSubmit }: { onSubmit: (text: string) => void }) {
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!msg.trim()) {
      setError('Message cannot be empty');
      return;
    }
    setError('');
    onSubmit(msg);
    setMsg('');
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type your message..."
        className={styles.input}
        required
      />
      <button type="submit" className={styles.button}>Send</button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
}
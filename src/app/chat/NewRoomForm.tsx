'use client';
import React, { useState } from 'react';
import styles from './chat.module.css';

export default function NewRoomForm({ onRoomCreated }: { onRoomCreated?: () => void }) {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/chat/rooms', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ name }),
            });

            if (!res.ok){
                const err = await res.json();
                setError(err.error || 'Failed to create room');
                return;
            }

            setName('');
            if (onRoomCreated) onRoomCreated();
        } catch (err) {
            setError('An error occurred while creating the room');
        }
    }

    return (
    <div>
      <form onSubmit={handleSubmit} className={styles.newRoomForm}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New Room Name"
          required
          className={styles.newRoomInput}
        />
        <button type="submit" className={styles.newRoomButton}>
          Create Room
        </button>
      </form>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );


}
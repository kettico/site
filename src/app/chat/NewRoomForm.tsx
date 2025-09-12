'use client';
import React, { useState } from 'react';
import styles from './chat.module.css';

export default function NewRoomForm({ onRoomCreated }: { onRoomCreated?: () => void }) {
    const [roomName, setRoomName] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError('');

        try {
            const res = await fetch('/api/chat/rooms', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ roomName }),
            });

            if (!res.ok){
                const err = await res.json();
                setError(err.error || 'Failed to create room');
                return;
            }

            setRoomName('');
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
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
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
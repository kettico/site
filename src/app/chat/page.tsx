'use client';
import NewRoomForm from "./NewRoomForm";
import RoomCard from "./RoomCard";
import styles from "./chat.module.css";
import {useEffect, useState} from "react";

export default function ChatPage() {
    const [rooms, setRooms] = useState<Array<{name: string, roomID: number}>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    async function fetchRooms() {
        try {
            setLoading(true);
            const res = await fetch('/api/chat/rooms');
            const data = await res.json();
            setRooms(data.rooms);
        } catch (err) {
            setError('Failed to load rooms');
        } finally {
            setLoading(false);
        }
    }

    
    useEffect(() => {
        fetchRooms();
    }, []);


    return (
        <div>
            <h1>Chat Room</h1>
            {loading ? <p>Loading rooms...</p> : (
                <div className={styles.cardContainer}>
                    {rooms.map(room => (
                    <RoomCard key={room.roomID} name={room.name} roomID={room.roomID} />
                    ))}
                </div>
            )}
            {error && <p className={styles.errorMessage}>{error}</p>}

            <NewRoomForm onRoomCreated={fetchRooms} />
        </div>
    );
}

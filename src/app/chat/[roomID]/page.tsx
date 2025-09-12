'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles  from './room.module.css';
import MessageBox from './Message';
import NewMessage from './NewMessageForm';

type message = {
  id: number;
  text: string;
  sender: string;  
}

export default function RoomPage() {
  const { roomID } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [messages, setMessages] = useState<Array<message>>([]);

  async function GetMessages(){
    try {
      setLoading(true);
      const res = await fetch(`/api/chat/rooms/${roomID}`);
      const data = await res.json();
      setMessages(data.messages);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load room');
      setMessages([]); // fallback to empty array
    } finally {
      setLoading(false);
    }
  }

  async function PostNewMessage(msg: String){
    try{
      const res = await fetch('/api/chat/rooms/' + roomID, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ text: msg, sender: 'User' }),
      });
    } catch(err) {
      console.error('Fetch error:', err);
      setError('Failed to send message');
    }
    GetMessages();
  }

  useEffect(() => {
    console.log('roomID:', roomID);

        GetMessages();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? <p>Loading rooms...</p> : (
      <div className={styles.msgContainer}>
          {messages.map(msg => (
              <MessageBox key={msg.id} text={msg.text} sender={msg.sender} />
            ))}
        </div>
      )}
      {error && <p className={styles.errorMessage}>{error}</p>}
      <NewMessage onSubmit={PostNewMessage} />
    </div>
  );
}

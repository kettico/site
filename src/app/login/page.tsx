'use client';
import { useState } from "react";
import styles from './login.module.css';


export default function LogsinPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setError('');
        
        try {
            const res = await fetch ('/api/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password}),
            });
            if (!res.ok) {
                setError('Invalid credentials');
                return;
            }
            console.log('Login successful');
            // Redirect to dashboard
            window.location.href = '/dashboard';

        } catch (err) {
            console.log(err);
            setError('Login failed. Please try again.');
        }
    }

  return (
    <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
            <input 
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={styles.input}
            />
            <input 
                type="text"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
            />
            <button type="submit" className={styles.button}>Login</button>
            {error && <p>{error}</p>}
        </form>
    </div>)
}
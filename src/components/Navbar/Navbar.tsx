'use client';
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function NavBar() {
  const [username, setUsername] = useState<string | null>(null);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const user = Cookies.get("username");
    setUsername(user || null);
  }, []);

    async function handleLogin(event: React.FormEvent) {
        event.preventDefault();

        try {
          const res = await fetch ('/api/login', {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({ username: loginUser, password: loginPass }),
          });
          if (!res.ok) {
            console.log('invalid credentials');
              return;
          }
          Cookies.set("username", loginUser);
          setUsername(loginUser);
          setLoginUser("");
          setLoginPass("");
          window.location.reload(); // refresh to reflect login state
        } catch (err) {
            console.log(err);
        }
    }

  const handleLogout = () => {
    Cookies.remove("username");
    setUsername(null);
  };

  return (
    <nav className={`${styles.nav} ${collapsed ? styles.collapsed : ""}`}>
      <button
        className={styles.toggleBtn}
        onClick={() => setCollapsed(prev => !prev)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? "→" : "←"}
      </button>

      {!collapsed && (
        <>
          <div className={styles.links}>
            <Link href="/">Home</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/games">Games</Link>
            <Link href="/chat">Chat</Link>
          </div>

          <div className={styles.auth}>
            {username ? (
              <>
                <Link href="/account" className={styles.username}>{username}</Link>
                <button className={styles.fullWidthButton} onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Username"
                  value={loginUser}
                  onChange={e => setLoginUser(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={loginPass}
                  onChange={e => setLoginPass(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      handleLogin(e);
                    }
                  }}
                />
                <div className={styles.buttonRow}>
                  <button onClick={handleLogin}>Log In</button>
                  <button>Sign Up</button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </nav>
  );
}
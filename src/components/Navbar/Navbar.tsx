'use client';
import Link from "next/link";
import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function NavBar() {
  const [username, setUsername] = useState<string | null>(null);
  const [loginUser, setLoginUser] = useState("");
  const [loginPass, setLoginPass] = useState("");

  useEffect(() => {
    const user = Cookies.get("username");
    setUsername(user || null);
  }, []);

  const handleLogin = () => {
    if (loginUser && loginPass) {
      Cookies.set("username", loginUser);
      setUsername(loginUser);
      setLoginUser("");
      setLoginPass("");
    }
  };

  const handleLogout = () => {
    Cookies.remove("username");
    setUsername(null);
  }

  return (
    <nav className={styles.nav}>
      <Link href="/">Home</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/games">Games</Link>
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
                  handleLogin();
                }
              }}
            />
            <div className={styles["button-row"]}>
              <button onClick={handleLogin}>Log In</button>
              <button>Sign Up</button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
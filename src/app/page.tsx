"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div style={styles.container}>

      {/* Floating icons background */}
      <div style={styles.background}>
        ⛳ 🏌️ 🏆 🎯 ⛳ 🏌️ 🏆 🎯 ⛳ 🏌️ 🏆 🎯
      </div>

      <h1 style={styles.title}>Golf Platform 🚀</h1>

      <p style={styles.subtitle}>
        Track your golf performance, compete with others, and stay on top of the leaderboard.
      </p>

      <div style={styles.buttonContainer}>
        <Link href="/login">
          <button style={styles.loginBtn}>Login</button>
        </Link>

        <Link href="/signup">
          <button style={styles.signupBtn}>Signup</button>
        </Link>
      </div>

    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    backgroundColor: "#0a0a0a",
    color: "white",
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center" as const,
    overflow: "hidden",
    position: "relative" as const,
  },

  background: {
    position: "absolute" as const,
    top: "10%",
    left: "0",
    width: "100%",
    opacity: 0.1,
    fontSize: "30px",
    animation: "move 20s linear infinite",
  },

  title: {
    fontSize: "48px",
    fontWeight: "bold",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "18px",
    marginBottom: "30px",
    maxWidth: "500px",
  },

  buttonContainer: {
    display: "flex",
    gap: "15px",
  },

  loginBtn: {
    padding: "10px 20px",
    backgroundColor: "#22c55e",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    color: "white",
  },

  signupBtn: {
    padding: "10px 20px",
    backgroundColor: "#3b82f6",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    color: "white",
  },
};
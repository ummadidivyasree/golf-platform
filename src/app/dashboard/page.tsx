"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Score = {
  id: number;
  score: number;
  email: string;
  created_at: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [score, setScore] = useState("");
  const [scores, setScores] = useState<Score[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const router = useRouter();

  const fetchScores = async (userId: string) => {
    const { data } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (data) setScores(data);
  };

  const fetchLeaderboard = async () => {
    const { data } = await supabase
      .from("scores")
      .select("email, score");

    if (!data) return;

    const map = new Map<string, number>();

    data.forEach((item: any) => {
      if (!map.has(item.email) || map.get(item.email)! < item.score) {
        map.set(item.email, item.score);
      }
    });

    const result = Array.from(map, ([email, score]) => ({
      email,
      score,
    }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    setLeaderboard(result);
  };

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) router.push("/login");
      else {
        setUser(data.user);
        fetchScores(data.user.id);
        fetchLeaderboard();
      }
    };

    loadUser();
  }, []);

  const addScore = async () => {
    const num = Number(score);
    if (!score || isNaN(num)) return alert("Enter valid score");

    const { data } = await supabase.auth.getUser();
    if (!data.user) return;

    await supabase.from("scores").insert([
      {
        user_id: data.user.id,
        email: data.user.email,
        score: num,
      },
    ]);

    setScore("");
    fetchScores(data.user.id);
    fetchLeaderboard();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const total = scores.reduce((sum, s) => sum + s.score, 0);
  const best = scores.length ? Math.max(...scores.map((s) => s.score)) : 0;
  const least = scores.length ? Math.min(...scores.map((s) => s.score)) : 0;

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2>Golf Dashboard 🚀</h2>
        <button style={styles.logout} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* STATS */}
      <div style={styles.stats}>
        <div style={styles.statBox} className="hover-card">Best: {best}</div>
        <div style={styles.statBox} className="hover-card">Least: {least}</div>
        <div style={styles.statBox} className="hover-card">Total: {total}</div>
      </div>

      {/* ADD SCORE */}
      <div style={styles.card} className="hover-card">
        <h3>Add Score</h3>
        <input
          style={styles.input}
          value={score}
          onChange={(e) => setScore(e.target.value)}
          placeholder="Enter score"
        />
        <button style={styles.button} onClick={addScore}>
          Add
        </button>
      </div>

      {/* SCORES */}
      <div style={styles.card} className="hover-card">
        <h3>Your Scores</h3>
        {scores.map((s) => (
          <p key={s.id}>
            {s.score} - {new Date(s.created_at).toLocaleString()}
          </p>
        ))}
      </div>

      {/* LEADERBOARD */}
      <div style={styles.card} className="hover-card">
        <h3>Leaderboard</h3>
        {leaderboard.map((item, i) => (
          <p key={i}>
            #{i + 1} {item.email} - {item.score}
          </p>
        ))}
      </div>

    </div>
  );
}

const styles = {
  container: {
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    minHeight: "100vh",
    padding: "20px",
    color: "#e2e8f0",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },

  logout: {
    backgroundColor: "#ef4444",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  stats: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  statBox: {
    flex: 1,
    backgroundColor: "#1e293b",
    padding: "15px",
    textAlign: "center" as const,
    borderRadius: "10px",
  },

  card: {
    backgroundColor: "#1e293b",
    padding: "15px",
    marginBottom: "15px",
    borderRadius: "10px",
  },

  input: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "none",
  },

  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
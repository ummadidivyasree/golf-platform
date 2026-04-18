"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [score, setScore] = useState("");
  const [scores, setScores] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.push("/login");
      } else {
        setUser(data.user);
        fetchScores(data.user.id);
        fetchLeaderboard();
      }
    };

    loadUser();
  }, []);

  const fetchScores = async (userId: string) => {
    const { data } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (data) setScores(data);
  };

  // ✅ Leaderboard (unique users)
  const fetchLeaderboard = async () => {
    const { data } = await supabase
      .from("scores")
      .select("email, score");

    if (!data) return;

    const map = new Map();

    data.forEach((item) => {
      if (!map.has(item.email) || map.get(item.email) < item.score) {
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

  // ✅ Add score with PRD logic
  const addScore = async () => {
    const numericScore = Number(score);

    // 🔴 Validation
    if (!score || isNaN(numericScore)) {
      alert("Enter a valid number");
      return;
    }

    if (numericScore < 1 || numericScore > 45) {
      alert("Score must be between 1 and 45");
      return;
    }

    const { data } = await supabase.auth.getUser();
    if (!data.user) return;

    setLoading(true);

    // 🔥 If already 5 scores → delete oldest
    if (scores.length >= 5) {
      const oldest = scores[scores.length - 1]; // last item = oldest

      await supabase
        .from("scores")
        .delete()
        .eq("id", oldest.id);
    }

    // ✅ Insert new score
    const { error } = await supabase.from("scores").insert([
      {
        user_id: data.user.id,
        email: data.user.email,
        score: numericScore,
      },
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      setScore("");
      fetchScores(data.user.id);
      fetchLeaderboard();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">

      {/* Header */}
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold">Golf Dashboard 🚀</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* User */}
      <div className="bg-gray-800 p-4 rounded mb-6">
        <p>Welcome</p>
        <h2 className="text-lg">{user?.email}</h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Box label="Total" value={scores.length} />
        <Box
          label="Best"
          value={
            scores.length
              ? Math.max(...scores.map((s) => s.score))
              : "--"
          }
        />
        <Box
          label="Latest"
          value={scores.length ? scores[0].score : "--"}
        />
        <Box
          label="Average"
          value={
            scores.length
              ? Math.round(
                  scores.reduce((a, b) => a + b.score, 0) /
                    scores.length
                )
              : "--"
          }
        />
      </div>

      {/* Add Score */}
      <div className="bg-gray-800 p-4 rounded mb-6">
        <h2 className="mb-2">Add Score</h2>

        <div className="flex gap-2">
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            placeholder="1 - 45"
            className="flex-1 p-2 bg-gray-700 text-white rounded"
          />

          <button
            onClick={addScore}
            disabled={loading}
            className="bg-green-500 px-4 rounded"
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>

      {/* Scores */}
      <div className="bg-gray-800 p-4 rounded mb-6">
        <h2 className="mb-2">Your Scores</h2>

        {scores.map((s) => (
          <div key={s.id} className="flex justify-between mb-1">
            <span>{s.score}</span>
            <span>
              {new Date(s.created_at).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="bg-gray-800 p-4 rounded">
        <h2 className="mb-2">Leaderboard 🏆</h2>

        {leaderboard.map((item, i) => (
          <div key={i} className="flex justify-between mb-1">
            <span>#{i + 1} {item.email}</span>
            <span>{item.score}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

function Box({ label, value }: any) {
  return (
    <div className="bg-gray-800 p-4 rounded text-center">
      <p className="text-sm">{label}</p>
      <h3 className="text-xl">{value}</h3>
    </div>
  );
}
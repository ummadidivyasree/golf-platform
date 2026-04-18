"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col items-center justify-center px-6">

      {/* 🌌 Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-95" />

      {/* 💫 Floating blur circles */}
      <div className="absolute w-72 h-72 bg-green-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse" />
      <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse" />

      {/* ⚽ Watermark Icons */}
      <div className="absolute inset-0 opacity-10 text-6xl flex flex-wrap gap-10 justify-center items-center pointer-events-none">
        ⛳ 🏌️‍♂️ 🏆 🎯 ⛳ 🏌️‍♂️ 🏆 🎯 ⛳ 🏌️‍♂️ 🏆 🎯
      </div>

      {/* 🚀 Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Golf Platform 🚀
        </h1>

        <p className="text-gray-400 max-w-xl mx-auto mb-8">
          Track your golf performance, compete with others, and stay on top of the leaderboard.
        </p>

        <div className="flex gap-4 justify-center">
          {!user ? (
            <>
              <button
                onClick={() => router.push("/login")}
                className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold transition"
              >
                Login
              </button>

              <button
                onClick={() => router.push("/signup")}
                className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg transition"
              >
                Signup
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold"
            >
              Go to Dashboard
            </button>
          )}
        </div>
      </motion.div>

      {/* 🧊 Feature Cards */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full"
      >
        <Feature title="📊 Track Scores" desc="Keep your last 5 scores updated automatically." />
        <Feature title="🏆 Leaderboard" desc="See where you stand among players." />
        <Feature title="⚡ Fast & Secure" desc="Built with modern tech stack." />
      </motion.div>
    </div>
  );
}

function Feature({ title, desc }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white/5 backdrop-blur-lg p-6 rounded-xl border border-white/10"
    >
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{desc}</p>
    </motion.div>
  );
}
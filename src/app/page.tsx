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
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden px-6">

      {/* Background glow */}
      <div className="absolute w-72 h-72 bg-green-500/20 rounded-full blur-3xl top-10 left-10" />
      <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl bottom-10 right-10" />

      {/* Watermark icons */}
      <div className="absolute inset-0 opacity-10 text-5xl flex flex-wrap gap-10 justify-center items-center pointer-events-none">
        ⛳ 🏌️ 🏆 🎯 ⛳ 🏌️ 🏆 🎯
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="z-10 text-center"
      >
        <h1 className="text-5xl font-bold mb-4">Golf Platform 🚀</h1>

        <p className="text-gray-400 mb-6">
          Track your golf performance and compete with others.
        </p>

        <div className="flex gap-4 justify-center">
          {!user ? (
            <>
              <button
                onClick={() => router.push("/login")}
                className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg"
              >
                Login
              </button>

              <button
                onClick={() => router.push("/signup")}
                className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-lg"
              >
                Signup
              </button>
            </>
          ) : (
            <button
              onClick={() => router.push("/dashboard")}
              className="bg-green-500 px-6 py-3 rounded-lg"
            >
              Dashboard
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
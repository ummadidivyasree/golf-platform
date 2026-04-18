"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Login successful!");
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
        
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Welcome Back 🚀
        </h2>

        <p className="text-gray-300 text-center mb-6">
          Login to continue
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-white/20 border border-gray-400 text-white placeholder-gray-300"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded-lg bg-white/20 border border-gray-400 text-white placeholder-gray-300"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full p-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg"
        >
          Login
        </button>

        <p className="text-gray-400 text-center mt-4 text-sm">
          New user?{" "}
          <Link href="/signup" className="text-blue-400">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
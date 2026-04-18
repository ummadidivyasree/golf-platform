"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Signup successful!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
        
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Create Account ✨
        </h2>

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
          onClick={handleSignup}
          className="w-full p-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg"
        >
          Sign Up
        </button>

        <p className="text-gray-400 text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-green-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
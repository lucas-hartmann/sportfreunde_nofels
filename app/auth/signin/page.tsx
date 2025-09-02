"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.error) {
      setError("Login failed: Invalid username or password");
    } else {
      router.push("/hobbyliga/edit");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-b from-primary to-gray-200">
      <form
        onSubmit={handleSubmit}
        className="w-96 p-8 bg-white/90 backdrop-blur-md shadow-lg rounded-xl flex flex-col gap-6"
      >
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Editor Login
        </h1>

        {error && (
          <div className="text-red-600 text-sm text-center font-medium">
            {error}
          </div>
        )}

        {/* Username */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 font-medium">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Password with eye icon inside input */}
        <div className="flex flex-col">
          <label className="mb-1 text-gray-700 font-medium">Passwort</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-[#781c12] text-white font-extrabold py-2 rounded-xl text-xl hover:bg-[#a62c1a] transition disabled:opacity-50"
        >
          Log In
        </button>
      </form>
    </div>
  );
}

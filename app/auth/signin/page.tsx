"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: true,            // important: redirect automatically
      username,
      password,
      callbackUrl: "/hobbyliga/edit",
    });

    console.log(res); // debug
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="p-6 bg-white shadow rounded w-80">
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border px-3 py-2 rounded" />
        </div>

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Sign in</button>
      </form>
    </div>
  );
}

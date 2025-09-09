"use client";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800 px-4">
      {/* Club Logo Placeholder */}
      <div className="mb-6">
        <img
          src="/logos/sfn_logo.webp" 
          alt="Vereinslogo"
          className="w-24 h-24 object-contain"
        />
      </div>

      {/* 404 Text */}
      <h1 className="text-6xl font-bold mb-4 text-center text-primary">404</h1>
      <p className="text-xl mb-6 text-center">
        Varruckt! Dia Sita gibt's leider ne.
      </p>

      {/* Button back home */}
      <button
        onClick={() => router.push("/")}
        className="py-2 px-2 bg-[#781c12] text-white font-extrabold py-4 rounded-xl text-xl hover:bg-[#a62c1a] transition disabled:opacity-50"
      >
        Zur Startseite
      </button>
    </div>
  );
}

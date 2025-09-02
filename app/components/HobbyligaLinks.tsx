"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function HobbyligaLinks() {
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";

  // Avoid rendering anything until session is loaded to prevent hydration errors
  if (status === "loading") return null;

  return (
    <>
      {isLoggedIn ? (
        <>
          <li>
            <Link
              href="/hobbyliga/edit"
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
            >
              Editor
            </Link>
          </li>
          <li>
            <button
              onClick={() => signOut()}
              className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <li>
          <button
            onClick={() => signIn()}
            className="text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
          >
            Login
          </button>
        </li>
      )}
    </>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HobbyligaEditPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [matchdaysData, setMatchdaysData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/hobbyliga/edit");
    }
  }, [status, router]);

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/matchdays")
        .then((res) => res.json())
        .then((data) => {
          setMatchdaysData(data);
          setLoading(false);
        });
    }
  }, [status]);

  const handleScoreChange = (
    matchdayId: number,
    matchIndex: number,
    team: "home" | "away",
    value: number | ""
  ) => {
    setMatchdaysData((prev) =>
      prev.map((md) =>
        md.id === matchdayId
          ? {
              ...md,
              matches: md.matches.map((m: any, idx: number) =>
                idx === matchIndex
                  ? {
                      ...m,
                      score: {
                        ...m.score,
                        [team]: value === "" ? null : value,
                      },
                    }
                  : m
              ),
            }
          : md
      )
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/matchdays", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(matchdaysData),
    });
    alert("Scores updated ✅");
  };

  if (status === "loading" || loading) return <p>Loading...</p>;
  if (status === "unauthenticated") return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hobbyliga Edit Scores</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {matchdaysData.map((md) => (
          <div key={md.id} className="border p-4 rounded-md bg-gray-50">
            <h2 className="font-semibold mb-2">{md.name}</h2>
            {md.matches.map((match: any, idx: number) => (
              <div
                key={idx}
                className="grid grid-cols-6 gap-2 mb-2 items-center"
              >
                <span className="col-span-1 font-medium">{match.home}</span>
                <input
                  type="number"
                  value={match.score?.home ?? ""}
                  onChange={(e) =>
                    handleScoreChange(
                      md.id,
                      idx,
                      "home",
                      e.target.value === "" ? "" : parseInt(e.target.value)
                    )
                  }
                  className="border px-2 py-1 rounded col-span-1 w-full"
                  min={0}
                />
                <span className="text-center col-span-1">-</span>
                <input
                  type="number"
                  value={match.score?.away ?? ""}
                  onChange={(e) =>
                    handleScoreChange(
                      md.id,
                      idx,
                      "away",
                      e.target.value === "" ? "" : parseInt(e.target.value)
                    )
                  }
                  className="border px-2 py-1 rounded col-span-1 w-full"
                  min={0}
                />
                <span className="col-span-2 text-gray-500">
                  {match.away} ({match.day}, {match.date} {match.time},{" "}
                  {match.location})
                </span>
              </div>
            ))}
          </div>
        ))}
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded mt-4"
        >
          Save Scores
        </button>
      </form>
    </div>
  );
}

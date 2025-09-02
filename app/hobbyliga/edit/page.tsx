"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function HobbyligaEditPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [matchdaysData, setMatchdaysData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);

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

    // show toast instead of alert
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  if (status === "loading" || loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Lade Spielplan...</p>
      </div>
    );
  if (status === "unauthenticated") return null;

  return (
    <div className="p-6 mt-20">
      <h1 className="text-2xl font-bold mb-4">Hobbyliga Edit Scores</h1>
<form onSubmit={handleSubmit} className="flex flex-col gap-3">
  <button
    type="submit"
    className="bg-blue-600 text-white py-2 px-4 rounded w-36 self-end"
  >
    Save Scores
  </button>

  {matchdaysData.map((md) => (
    <div key={md.id} className="border p-3 rounded-md bg-gray-50">
      <h2 className="font-semibold mb-2 text-sm">{md.name}</h2>
      {md.matches.map((match: any, idx: number) => (
        <div
          key={idx}
          className="grid grid-cols-[auto_auto_auto_auto_auto_1fr] items-center gap-2 mb-2 min-h-[40px] sm:min-h-[48px]"
        >
          <span className="font-medium text-sm">{match.home}</span>
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
            className="border px-2 py-1.5 text-sm rounded w-14 sm:w-16"
            min={0}
          />
          <span className="text-center text-sm">-</span>
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
            className="border px-2 py-1.5 text-sm rounded w-14 sm:w-16"
            min={0}
          />
          <span className="font-medium text-sm">{match.away}</span>
          <span className="text-gray-500 text-xs sm:text-sm">
            ({match.day}, {match.date} {match.time}, {match.location})
          </span>
        </div>
      ))}
    </div>
  ))}
</form>


      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-secondary px-8 py-4 rounded-lg shadow-lg">
          ✅ Ergebnisse erfolgreich gespeichert!
        </div>
      )}
    </div>
  );
}

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
    <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-gray-800 mb-6">
      Ergebnis Editor
    </h1>

    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4 max-w-3xl mx-auto mb-28">
      {matchdaysData.map((md) => (
        <div key={md.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
          <h2 className="font-semibold mb-3 text-lg text-gray-700">{md.name}</h2>

          <div className="flex flex-col gap-3">
            {md.matches.map((match: any, idx: number) => (
              <div
                key={idx}
                className="grid grid-cols-[1fr_auto_auto_auto_1fr] items-center gap-2 sm:gap-4 p-2 bg-gray-50 rounded-md"
              >
                <span className="font-medium text-sm sm:text-base truncate">{match.home}</span>

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
                  className="border border-gray-300 px-2 py-1.5 sm:py-2 text-sm sm:text-base rounded w-14 sm:w-16 text-center"
                  min={0}
                />

                <span className="text-center text-sm sm:text-base">-</span>

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
                  className="border border-gray-300 px-2 py-1.5 sm:py-2 text-sm sm:text-base rounded w-14 sm:w-16 text-center"
                  min={0}
                />

                <span className="font-medium text-sm sm:text-base truncate">{match.away}</span>

                <span className="col-span-full text-gray-500 text-xs sm:text-sm mt-1 sm:mt-0">
                  ({match.day}, {match.date} {match.time}, {match.location})
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-20 right-4 bg-primary text-white px-6 py-3 rounded-lg shadow-lg z-50">
          ✅ Ergebnisse erfolgreich gespeichert!
        </div>
      )}

      {/* Sticky Save Button */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          type="submit"
          className="bg-[#781c12] text-white font-extrabold py-1 rounded-xl text-xl hover:bg-[#a62c1a] transition disabled:opacity-50 py-3 px-8"
        >
          Speichern
        </button>
      </div>
    </form>
    </div>
  );
}

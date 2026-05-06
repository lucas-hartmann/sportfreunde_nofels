"use client";

import { useState, useEffect, useMemo } from "react";
import Header from "../../components/Header";

// Typen basierend auf dem neuen API-Format (Screenshot)
type Team = {
  name: string;
  logo_url: string | null;
};

type Match = {
  id: string;
  matchday: number;
  match_date: string; // ISO String von API
  venue: string;
  status: string;
  home_team: Team;
  away_team: Team;
  home_score: number | null;
  away_score: number | null;
};

export default function Spielplan() {
  const [activeTab, setActiveTab] = useState<"all" | "sfn">("all");
  const [showPast, setShowPast] = useState(true);
  const [allMatches, setAllMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const SFN_ID = "912f92a9-c735-4fe0-b790-cdd4a634ab10";

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        // Wir laden den gesamten Spielplan der Saison 2026
        const response = await fetch(
          "https://fpiylhqnexlnlxketmzk.supabase.co/functions/v1/public-api/schedule"
        );
        const data = await response.json();
        setAllMatches(data.schedule || []);
      } catch (err) {
        console.error("Fehler beim Laden des Spielplans:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  // Filter-Logik
  const filteredMatches = useMemo(() => {
    let filtered = [...allMatches];

    // Tab Filter (Alle vs SFN)
    if (activeTab === "sfn") {
      filtered = filtered.filter(
        (m) =>
          m.home_team.name === "Sportfreunde Nofels" ||
          m.away_team.name === "Sportfreunde Nofels"
      );
    }

    // Past Toggle Filter
    if (!showPast) {
      const now = new Date();
      filtered = filtered.filter((m) => new Date(m.match_date) >= now);
    }

    // Sortierung nach Datum
    return filtered.sort(
      (a, b) => new Date(a.match_date).getTime() - new Date(b.match_date).getTime()
    );
  }, [allMatches, activeTab, showPast]);

  // Hilfsfunktionen
  function formatDate(isoString: string) {
    const date = new Date(isoString);
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  function formatTime(isoString: string) {
    const date = new Date(isoString);
    return date.toLocaleTimeString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const pillBase = "px-5 py-2 rounded-full font-bold transition border text-xs uppercase tracking-wider";
  const pillActive = "bg-primary text-white border-primary shadow-sm";
  const pillInactive = "bg-gray-100 text-gray-500 border-transparent hover:bg-gray-200";

  return (
    <div className="min-h-screen bg-white">
      <Header title="SPIELPLAN 2026" image="/headers/spielplan.webp" />

      <div className="container mx-auto px-4 py-10 max-w-5xl">
        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("all")}
              className={`${pillBase} ${activeTab === "all" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500"}`}
            >
              Gesamt
            </button>
            <button
              onClick={() => setActiveTab("sfn")}
              className={`${pillBase} ${activeTab === "sfn" ? "bg-white text-primary shadow-sm" : "text-primary"}`}
            >
              SF Nofels
            </button>
          </div>

          <button
            onClick={() => setShowPast((p) => !p)}
            className="text-xs font-bold uppercase tracking-widest text-primary hover:opacity-70 transition"
          >
            {showPast ? "Vergangene ausblenden —" : "Vergangene anzeigen +"}
          </button>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-gray-400 animate-pulse">Lade Spielplan...</div>
        ) : (
          <div className="space-y-4">
            {/* Desktop Table */}
            <div className="hidden sm:block border border-gray-100 rounded-lg overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase w-16 text-center">Tag</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase">Heim</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase text-center w-24">Ergebnis</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase">Gast</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase text-center">Datum</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase">Ort</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredMatches.map((m) => {
                    const isNofelsHome = m.home_team.name === "Sportfreunde Nofels";
                    const isNofelsAway = m.away_team.name === "Sportfreunde Nofels";
                    return (
                      <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4 text-xs font-bold text-gray-300 text-center">{m.matchday}</td>
                        <td className={`px-4 py-4 text-sm font-semibold ${isNofelsHome ? "text-primary" : "text-gray-700"}`}>{m.home_team.name}</td>
                        <td className="px-4 py-4 text-center font-mono font-bold text-sm bg-gray-50/50">
                          {m.home_score !== null ? `${m.home_score} : ${m.away_score}` : "vs"}
                        </td>
                        <td className={`px-4 py-4 text-sm font-semibold ${isNofelsAway ? "text-primary" : "text-gray-700"}`}>{m.away_team.name}</td>
                        <td className="px-4 py-4 text-center text-[11px] text-gray-500 whitespace-nowrap">
                          {formatDate(m.match_date)} <span className="block font-bold text-gray-900">{formatTime(m.match_date)}</span>
                        </td>
                        <td className="px-4 py-4 text-xs text-gray-400">{m.venue}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden space-y-3">
              {filteredMatches.map((m) => (
                <div key={m.id} className="border border-gray-100 rounded-xl p-4 shadow-sm bg-white">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-black bg-gray-100 px-2 py-1 rounded text-gray-400 uppercase">Tag {m.matchday}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase">{formatDate(m.match_date)} — {formatTime(m.match_date)}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className={`text-sm font-bold ${m.home_team.name === "Sportfreunde Nofels" ? "text-primary" : "text-gray-800"}`}>{m.home_team.name}</div>
                    <div className="flex items-center gap-4 py-1">
                      <div className="h-[1px] flex-1 bg-gray-100"></div>
                      <div className="text-sm font-black tracking-widest bg-gray-50 px-3 py-1 rounded border border-gray-100">
                        {m.home_score !== null ? `${m.home_score}:${m.away_score}` : "VS"}
                      </div>
                      <div className="h-[1px] flex-1 bg-gray-100"></div>
                    </div>
                    <div className={`text-sm font-bold text-right ${m.away_team.name === "Sportfreunde Nofels" ? "text-primary" : "text-gray-800"}`}>{m.away_team.name}</div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-50 text-[10px] text-gray-400 italic">
                    Ort: {m.venue}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
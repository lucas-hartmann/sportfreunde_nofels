"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { supabase } from "@/lib/supabaseClient";

// --- TYPES ---
type TeamStats = {
  club: string;
  spiele: number;
  siege: number;
  unentschieden: number;
  niederlagen: number;
  tore: number;
  gegentore: number;
  diff: number;
  punkte: number;
};

type Match = {
  home_team: string;
  away_team: string;
  home_score: number | null;
  away_score: number | null;
};

type APITeamStanding = {
  team_name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goals_for: number;
  goals_against: number;
  goal_difference: number;
  points: number;
};

export default function Tabelle() {
  const [season, setSeason] = useState<number>(2026);
  const [leagueData, setLeagueData] = useState<TeamStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        if (season === 2026) {
          const res = await fetch("https://fpiylhqnexlnlxketmzk.supabase.co/functions/v1/public-api/standings");
          const json = await res.json();
          const mapped: TeamStats[] = json.standings.map((t: APITeamStanding) => ({
            club: t.team_name,
            spiele: t.played,
            siege: t.won,
            unentschieden: t.drawn,
            niederlagen: t.lost,
            tore: t.goals_for,
            gegentore: t.goals_against,
            diff: t.goal_difference,
            punkte: t.points,
          }));
          setLeagueData(mapped);
        } else {
          const { data, error } = await supabase
            .from("matchdays")
            .select(`matches:matches(home_team, away_team, home_score, away_score)`)
            .eq("season", season);

          if (error) throw error;
          const matches: Match[] = data?.flatMap(d => d.matches as Match[]) || [];
          setLeagueData(calculateStatsFromMatches(matches));
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [season]);

  function calculateStatsFromMatches(matches: Match[]): TeamStats[] {
    const clubs = Array.from(new Set(matches.flatMap(m => [m.home_team, m.away_team])));
    const results: Record<string, TeamStats> = {};
    clubs.forEach(c => results[c] = { club: c, spiele: 0, siege: 0, unentschieden: 0, niederlagen: 0, tore: 0, gegentore: 0, diff: 0, punkte: 0 });

    matches.forEach(m => {
      if (m.home_score === null || m.away_score === null) return;
      const h = results[m.home_team], a = results[m.away_team];
      h.spiele++; a.spiele++;
      h.tore += m.home_score; h.gegentore += m.away_score;
      a.tore += m.away_score; a.gegentore += m.home_score;
      if (m.home_score > m.away_score) { h.siege++; h.punkte += 3; a.niederlagen++; }
      else if (m.home_score < m.away_score) { a.siege++; a.punkte += 3; h.niederlagen++; }
      else { h.unentschieden++; a.unentschieden++; h.punkte += 1; a.punkte += 1; }
      h.diff = h.tore - h.gegentore; a.diff = a.tore - a.gegentore;
    });
    return Object.values(results).sort((a, b) => b.punkte - a.punkte || b.diff - a.diff);
  }

  return (
    <div className="min-h-screen bg-white">
      <Header title={`TABELLE ${season}`} image="/headers/tabelle.webp" position="100% 100%" />

      <div className="container mx-auto px-4 py-10 max-w-5xl">
        
        {/* Dezentere Buttons */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-100 p-1 rounded-lg">
            {[2026, 2025].map((y) => (
              <button
                key={y}
                onClick={() => setSeason(y)}
                className={`px-5 py-1.5 rounded-md text-xs font-bold transition-all ${
                  season === y 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-gray-400 text-sm animate-pulse">Lade Tabelle...</div>
        ) : (
          <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
            {/* Scroll-Container für Mobile */}
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full text-left border-collapse min-w-[550px] sm:min-w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="pl-5 py-3 text-[10px] font-bold text-gray-400 uppercase w-10">#</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase sticky left-0 bg-gray-50">Club</th>
                    <th className="px-3 py-3 text-[10px] font-bold text-gray-400 uppercase text-center">Sp</th>
                    <th className="px-3 py-3 text-[10px] font-bold text-gray-400 uppercase text-center hidden sm:table-cell">S</th>
                    <th className="px-3 py-3 text-[10px] font-bold text-gray-400 uppercase text-center hidden sm:table-cell">U</th>
                    <th className="px-3 py-3 text-[10px] font-bold text-gray-400 uppercase text-center hidden sm:table-cell">N</th>
                    <th className="px-3 py-3 text-[10px] font-bold text-gray-400 uppercase text-center">Tore</th>
                    <th className="px-3 py-3 text-[10px] font-bold text-gray-400 uppercase text-center">Diff</th>
                    <th className="pr-5 py-3 text-[10px] font-bold text-gray-400 uppercase text-center">Pkt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {leagueData.map((team, index) => {
                    const isNofels = team.club === "SF Nofels" || team.club === "Sportfreunde Nofels";
                    return (
                      <tr key={team.club} className="hover:bg-gray-50/50 transition-colors">
                        <td className="pl-5 py-3.5 text-xs text-gray-400 font-medium">{index + 1}</td>
                        <td className={`px-4 py-3.5 text-sm font-semibold sticky left-0 bg-white group-hover:bg-gray-50 transition-colors ${
                          isNofels ? "text-primary" : "text-gray-700"
                        }`}>
                          {team.club}
                        </td>
                        <td className="px-3 py-3.5 text-center text-xs text-gray-500">{team.spiele}</td>
                        <td className="px-3 py-3.5 text-center text-xs text-gray-500 hidden sm:table-cell">{team.siege}</td>
                        <td className="px-3 py-3.5 text-center text-xs text-gray-500 hidden sm:table-cell">{team.unentschieden}</td>
                        <td className="px-3 py-3.5 text-center text-xs text-gray-500 hidden sm:table-cell">{team.niederlagen}</td>
                        <td className="px-3 py-3.5 text-center text-xs text-gray-500 font-mono">{team.tore}:{team.gegentore}</td>
                        <td className={`px-3 py-3.5 text-center text-xs font-medium ${
                          team.diff > 0 ? "text-green-600" : team.diff < 0 ? "text-red-400" : "text-gray-300"
                        }`}>
                          {team.diff > 0 ? `+${team.diff}` : team.diff}
                        </td>
                        <td className={`pr-5 py-3.5 text-center text-sm font-bold ${isNofels ? "text-primary" : "text-gray-900"}`}>
                          {team.punkte}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <p className="mt-10 text-center text-gray-400 text-[11px] leading-relaxed max-w-xs mx-auto">
          Die Sportfreunde Nofels sind dieses Jahr nicht Veranstalter der Hobbyliga. Ergebnisse ohne Gewähr.
        </p>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";

// --- TYPES ---
type Scorer = {
  rank: number;
  player_name: string;
  team_name: string;
  goals: number;
};

// Hilfstyp für das API-Format
type APIScorer = {
  rank: number;
  first_name: string;
  last_name: string;
  goals: number;
  team: {
    name: string;
  };
};

export default function Torschuetzen() {
  const [scorers, setScorers] = useState<Scorer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadScorers() {
      setIsLoading(true);
      try {
        const res = await fetch(
          "https://fpiylhqnexlnlxketmzk.supabase.co/functions/v1/public-api/scorers?limit=10"
        );
        const json = await res.json();
        
        // Mapping der API-Daten (Verschachtelung auflösen & Namen zusammenfügen)
        const rawScorers = json.scorers || json;
        const mappedScorers: Scorer[] = rawScorers.map((s: APIScorer) => ({
          rank: s.rank,
          player_name: `${s.first_name} ${s.last_name}`,
          team_name: s.team.name,
          goals: s.goals,
        }));

        setScorers(mappedScorers);
      } catch (err) {
        console.error("Fehler beim Laden der Torschützen:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadScorers();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header 
        title="TORSCHÜTZEN 2026" 
        image="/headers/tabelle.webp" 
        position="100% 100%" 
      />

      <div className="container mx-auto px-4 py-10 max-w-3xl">
        
        {/* Info Badge */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-gray-50 px-4 py-1.5 rounded-full border border-gray-100 shadow-sm">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              Top 10 Scorer
            </span>
          </div>
        </div>

        {isLoading ? (
          <div className="py-20 text-center text-gray-400 text-sm animate-pulse">
            Lade Torschützenliste...
          </div>
        ) : (
          <div className="border border-gray-100 rounded-lg overflow-hidden shadow-sm">
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full text-left border-collapse min-w-[400px] sm:min-w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="pl-5 py-3 text-[10px] font-bold text-gray-400 uppercase w-12">#</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase sticky left-0 bg-gray-50">Spieler</th>
                    <th className="px-4 py-3 text-[10px] font-bold text-gray-400 uppercase">Verein</th>
                    <th className="pr-5 py-3 text-[10px] font-bold text-gray-400 uppercase text-center w-20">Tore</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {scorers.map((player, index) => {
                    const isNofels = player.team_name === "SF Nofels" || player.team_name === "Sportfreunde Nofels";
                    
                    return (
                      <tr key={`${player.player_name}-${index}`} className="hover:bg-gray-50/50 transition-colors">
                        <td className="pl-5 py-4 text-xs text-gray-400 font-medium">
                          {player.rank}
                        </td>
                        <td className="px-4 py-4 text-sm font-semibold sticky left-0 bg-white group-hover:bg-gray-50 transition-colors text-gray-800">
                          {player.player_name}
                        </td>
                        <td className={`px-4 py-4 text-xs font-medium ${isNofels ? "text-primary" : "text-gray-500"}`}>
                          {player.team_name}
                        </td>
                        <td className={`pr-5 py-4 text-center text-sm font-bold ${isNofels ? "text-primary" : "text-gray-900"}`}>
                          {player.goals}
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
          Die Torschützenliste wird automatisch basierend auf den Spielberichten aktualisiert. Ergebnisse ohne Gewähr.
        </p>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { supabase } from "@/lib/supabaseClient";

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
  id: number;
  matchday_id: number;
  home_team: string;
  away_team: string;
  day: string | null;
  date: string | null;
  time: string | null;
  location: string | null;
  note: string | null;
  home_score: number | null;
  away_score: number | null;
};

type Matchday = {
  id: number;
  name: string;
  matches: Match[];
};

export default function Tabelle() {
  const [matchdays, setMatchdays] = useState<Matchday[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        // Define Supabase type for select result
        type SupabaseMatchday = {
          id: number;
          name: string;
          matches: Match[] | null;
        };

        const { data, error } = await supabase
          .from("matchdays")
          .select(`id, name, matches:matches(*)`);

        if (error) {
          console.error("Supabase fetch error:", error);
          return;
        }

        // Normalize matches to always be an array
        const normalized: Matchday[] = (data as SupabaseMatchday[] | null)?.map(md => ({
          id: md.id,
          name: md.name,
          matches: md.matches || [],
        })) || [];

        setMatchdays(normalized);
      } catch (err) {
        console.error("Unexpected error loading matchdays:", err);
      }
    }

    loadData();
  }, []);

  // collect all clubs
  const clubs = Array.from(
    new Set(
      matchdays.flatMap((md) =>
        md.matches.flatMap((m: Match) => [m.home_team, m.away_team])
      )
    )
  );

  // initialize stats
  const leagueData: TeamStats[] = clubs.map((club) => ({
    club,
    spiele: 0,
    siege: 0,
    unentschieden: 0,
    niederlagen: 0,
    tore: 0,
    gegentore: 0,
    diff: 0,
    punkte: 0,
  }));

  // fill stats based on played matches
  matchdays.forEach((matchday) => {
    matchday.matches.forEach((match: Match) => {
      if (match.home_score === null || match.away_score === null) return;

      const homeTeam = leagueData.find((t) => t.club === match.home_team)!;
      const awayTeam = leagueData.find((t) => t.club === match.away_team)!;
      const homeGoals = match.home_score;
      const awayGoals = match.away_score;

      homeTeam.spiele += 1;
      awayTeam.spiele += 1;

      homeTeam.tore += homeGoals;
      homeTeam.gegentore += awayGoals;
      awayTeam.tore += awayGoals;
      awayTeam.gegentore += homeGoals;

      homeTeam.diff = homeTeam.tore - homeTeam.gegentore;
      awayTeam.diff = awayTeam.tore - awayTeam.gegentore;

      if (homeGoals > awayGoals) {
        homeTeam.siege += 1;
        homeTeam.punkte += 3;
        awayTeam.niederlagen += 1;
      } else if (homeGoals < awayGoals) {
        awayTeam.siege += 1;
        awayTeam.punkte += 3;
        homeTeam.niederlagen += 1;
      } else {
        homeTeam.unentschieden += 1;
        awayTeam.unentschieden += 1;
        homeTeam.punkte += 1;
        awayTeam.punkte += 1;
      }
    });
  });

  // sort by points, then goal difference
  leagueData.sort((a, b) => b.punkte - a.punkte || b.diff - a.diff);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="TABELLE 2025" image="/headers/tabelle.webp" position="100% 100%" />

      <div className="container mx-auto px-4 py-8">
        <div className="overflow-x-auto bg-white rounded-xl shadow-md">
          <table className="w-full table-fixed text-sm">
            <thead className="text-left text-gray-600 border-b">
              <tr>
                <th className="px-4 py-3 w-[10%]">Platz</th>
                <th className="px-4 py-3 w-[30%]">Club</th>
                <th className="px-4 py-3 w-[10%]">Sp</th>
                <th className="px-4 py-3 w-[10%]">S</th>
                <th className="px-4 py-3 w-[10%]">U</th>
                <th className="px-4 py-3 w-[10%]">N</th>
                <th className="px-4 py-3 w-[10%]">Tore</th>
                <th className="px-4 py-3 w-[10%]">Geg</th>
                <th className="px-4 py-3 w-[10%]">Diff</th>
                <th className="px-4 py-3 w-[10%]">Pkt</th>
              </tr>
            </thead>
            <tbody>
              {leagueData.map((team, index) => (
                <tr
                  key={`${team.club}-${index}`}
                  className="even:bg-gray-50 border-b last:border-none"
                >
                  <td className="px-4 py-3 font-semibold">{index + 1}</td>
                  <td className={`px-4 py-3 font-semibold ${team.club === "SF Nofels" ? "text-primary" : ""}`}>
                    {team.club}
                  </td>
                  <td className="px-4 py-3">{team.spiele}</td>
                  <td className="px-4 py-3">{team.siege}</td>
                  <td className="px-4 py-3">{team.unentschieden}</td>
                  <td className="px-4 py-3">{team.niederlagen}</td>
                  <td className="px-4 py-3">{team.tore}</td>
                  <td className="px-4 py-3">{team.gegentore}</td>
                  <td className="px-4 py-3">{team.diff}</td>
                  <td className="px-4 py-3 font-bold">{team.punkte}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-center mb-10 text-gray-500 text-lg transition">
          Die Sportfreunde Nofels sind dieses Jahr nicht die Veranstalter der Hobbyliga. <br /> Ergebnisse können falsch oder veraltet sein.
        </p>
      </div>
    </div>
  );
}

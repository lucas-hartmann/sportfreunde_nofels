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
  const [season, setSeason] = useState<number>(2026); // Default to 2026

  useEffect(() => {
    async function loadData() {
      try {
        type SupabaseMatchday = {
          id: number;
          name: string;
          matches: Match[] | null;
        };

        const { data, error } = await supabase
          .from("matchdays")
          .select(`id, name, matches:matches(*)`)
          .eq("season", season); // Only fetch matchdays for the selected season

        if (error) {
          console.error("Supabase fetch error:", error);
          return;
        }

        const normalized: Matchday[] =
          (data as SupabaseMatchday[] | null)?.map((md) => ({
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
  }, [season]); // Re-run this effect whenever the season changes

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
      <Header title={`TABELLE ${season}`} image="/headers/tabelle.webp" position="100% 100%" />

      <div className="container mx-auto px-4 py-8">
        
        {/* Season Toggle Dropdown */}
        <div className="flex justify-start mb-6">
          <div className="relative inline-block w-48">
            <select
              value={season}
              onChange={(e) => setSeason(Number(e.target.value))}
              className="appearance-none w-full bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-full font-normal shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm sm:text-base cursor-pointer"
            >
              <option value={2026}>Saison 2026</option>
              <option value={2025}>Saison 2025</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* MOBILE: stacked cards (no overlap, tighter spacing) */}
        <div className="grid gap-3 sm:hidden">
          {leagueData.map((team, index) => (
            <div
              key={`${team.club}-${index}`}
              className="rounded-xl bg-white shadow p-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm font-semibold shrink-0 w-6 text-center">
                    {index + 1}
                  </span>
                  <span
                    className={`text-base font-semibold truncate ${
                      team.club === "SF Nofels" ? "text-primary" : ""
                    }`}
                    title={team.club}
                  >
                    {team.club}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 leading-none">Pkt</div>
                  <div className="text-lg font-bold leading-none">{team.punkte}</div>
                </div>
              </div>

              {/* Inline stats */}
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-700">
                <span>Sp: <strong>{team.spiele}</strong></span>
                <span>S: <strong>{team.siege}</strong></span>
                <span>U: <strong>{team.unentschieden}</strong></span>
                <span>N: <strong>{team.niederlagen}</strong></span>
                <span>Diff: <strong>{team.diff}</strong></span>
                <span>Tore: <strong>{team.tore}:{team.gegentore}</strong></span>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP/TABLET: wide table */}
        <div className="hidden sm:block">
          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            {/* avoid table-fixed to let browser size columns; also give a safe min width */}
            <table className="w-full min-w-[720px] text-sm">
              <thead className="text-left text-gray-600 border-b">
                <tr className="whitespace-nowrap">
                  <th className="px-4 py-3 w-16">Platz</th>
                  <th className="px-4 py-3">Club</th>
                  <th className="px-2 py-3 text-center">Sp</th>
                  <th className="px-2 py-3 text-center">S</th>
                  <th className="px-2 py-3 text-center">U</th>
                  <th className="px-2 py-3 text-center">N</th>
                  <th className="px-2 py-3 text-center">Tore</th>
                  <th className="px-2 py-3 text-center">Geg</th>
                  <th className="px-2 py-3 text-center">Diff</th>
                  <th className="px-2 py-3 text-center">Pkt</th>
                </tr>
              </thead>
              <tbody>
                {leagueData.map((team, index) => (
                  <tr
                    key={`${team.club}-${index}`}
                    className="even:bg-gray-50 border-b last:border-none"
                  >
                    <td className="px-4 py-3 font-semibold">{index + 1}</td>
                    <td
                      className={`px-4 py-3 font-semibold max-w-[280px] truncate ${
                        team.club === "SF Nofels" ? "text-primary" : ""
                      }`}
                      title={team.club}
                    >
                      {team.club}
                    </td>
                    <td className="px-2 py-3 text-center">{team.spiele}</td>
                    <td className="px-2 py-3 text-center">{team.siege}</td>
                    <td className="px-2 py-3 text-center">
                      {team.unentschieden}
                    </td>
                    <td className="px-2 py-3 text-center">
                      {team.niederlagen}
                    </td>
                    <td className="px-2 py-3 text-center">{team.tore}</td>
                    <td className="px-2 py-3 text-center">{team.gegentore}</td>
                    <td className="px-2 py-3 text-center">{team.diff}</td>
                    <td className="px-2 py-3 text-center font-bold">
                      {team.punkte}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-center mb-10 text-gray-500 text-base sm:text-lg">
          Die Sportfreunde Nofels sind dieses Jahr nicht die Veranstalter der Hobbyliga.
          <br className="hidden sm:block" /> Ergebnisse können falsch oder veraltet sein.
        </p>
      </div>
    </div>
  );
}
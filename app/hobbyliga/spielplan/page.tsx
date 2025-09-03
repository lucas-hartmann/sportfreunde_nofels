"use client";

import { useState, useEffect } from "react";
import Header from "../../components/Header";
import { supabase } from "@/lib/supabaseClient";

function isPast(matchDate: string, matchTime: string): boolean {
  const matchDateTime = new Date(`${matchDate}T${matchTime}`);
  return matchDateTime < new Date();
}

export default function Spielplan() {
  const [activeTab, setActiveTab] = useState("all");
  const [showPast, setShowPast] = useState(true);
  const [matchdays, setMatchdays] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase
        .from("matchdays")
        .select("id, name, matches(*)") // relation to matches table
        .order("id", { ascending: true });

      if (error) {
        console.error("Error loading matchdays:", error.message);
      } else {
        // Transform Supabase data into your expected format
        const mapped = data.map((day) => ({
          id: day.id,
          name: day.name,
          matches: day.matches.map((m: any) => ({
            home: m.home_team,
            away: m.away_team,
            day: m.day,
            date: m.date, // already stored as yyyy-mm-dd
            time: m.time,
            location: m.location,
            score:
              m.home_score !== null && m.away_score !== null
                ? { home: m.home_score, away: m.away_score }
                : null,
          })),
        }));
        setMatchdays(mapped);
      }
    }
    loadData();
  }, []);

  const sfNofelsMatches = matchdays.flatMap((matchday) =>
    matchday.matches
      .filter(
        (match: any) => match.home === "SF Nofels" || match.away === "SF Nofels"
      )
      .map((match: any) => ({ ...match, matchdayName: matchday.name }))
  );

  function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header title="SPIELPLAN 2025" image="/headers/spielplan.webp" />

      {/* Tabs & Toggle */}
      <div className="container mx-auto px-4 py-6 space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2 rounded-full font-medium transition ${
                activeTab === "all"
                  ? "bg-black text-white"
                  : "bg-white text-black border"
              }`}
            >
              Gesamter Spielplan
            </button>
            <button
              onClick={() => setActiveTab("sfn")}
              className={`px-5 py-2 rounded-full font-medium transition ${
                activeTab === "sfn"
                  ? "bg-black text-white"
                  : "bg-white text-black border"
              }`}
            >
              Nur SFN Spiele
            </button>
          </div>

          {/* Toggle vergangene Spiele */}
          <div className="flex-shrink-0">
            <button
              onClick={() => setShowPast(!showPast)}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              {showPast
                ? "Vergangene Spiele ausblenden"
                : "Vergangene Spiele anzeigen"}
            </button>
          </div>
        </div>

        {/* Matches */}
        {activeTab === "all" ? (
          matchdays.map((matchday) => {
            const filteredMatches = matchday.matches.filter(
              (match) => showPast || !isPast(match.date, match.time)
            );

            if (filteredMatches.length === 0) return null;

            return (
              <div key={matchday.id} className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-800 bg-gray-200 rounded-md px-4 py-2">
                  {matchday.name}
                </h2>
                <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                  <table className="min-w-[640px] w-full table-fixed text-sm">
                    <thead className="text-left text-gray-600 border-b">
                      <tr>
                        <th className="px-4 py-3 w-[16%]">Heim</th>
                        <th className="px-4 py-3 w-[16%]">Ergebnis</th>
                        <th className="px-4 py-3 w-[16%]">Gast</th>
                        <th className="px-4 py-3 w-[20%]">Datum</th>
                        <th className="px-4 py-3 w-[12%]">Uhrzeit</th>
                        <th className="px-4 py-3 w-[20%]">Ort</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMatches.map((match, idx) => (
                        <tr
                          key={idx}
                          className="even:bg-gray-50 border-b last:border-none"
                        >
                          <td className="px-4 py-3 font-semibold">
                            {match.home}
                          </td>
                          <td className="px-4 py-3 text-gray-500">
                            {match.score
                              ? `${match.score.home} : ${match.score.away}`
                              : "-"}
                          </td>
                          <td className="px-4 py-3 font-semibold">
                            {match.away}
                          </td>
                          <td className="px-4 py-3">
                            {match.day}, {formatDate(match.date)}
                          </td>
                          <td className="px-4 py-3">{match.time}</td>
                          <td className="px-4 py-3">{match.location}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-md">
            <table className="min-w-[720px] w-full table-auto text-sm">
              <thead className="text-left text-gray-600 border-b">
                <tr>
                  <th className="px-4 py-3">Spieltag</th>
                  <th className="px-4 py-3">Heim</th>
                  <th className="px-4 py-3">Ergebnis</th>
                  <th className="px-4 py-3">Gast</th>
                  <th className="px-4 py-3">Datum</th>
                  <th className="px-4 py-3">Uhrzeit</th>
                  <th className="px-4 py-3">Ort</th>
                </tr>
              </thead>
              <tbody>
                {sfNofelsMatches
                  .filter(
                    (match) => showPast || !isPast(match.date, match.time)
                  )
                  .map((match, index) => (
                    <tr
                      key={index}
                      className="even:bg-gray-50 border-b last:border-none"
                    >
                      <td className="px-4 py-3 font-semibold">
                        {match.matchdayName}
                      </td>
                      <td
                        className={`px-4 py-3 font-semibold ${
                          match.home === "SF Nofels" ? "text-primary" : ""
                        }`}
                      >
                        {match.home}
                      </td>
                      <td className="px-4 py-3 text-gray-500">
                        {match.score
                          ? `${match.score.home} : ${match.score.away}`
                          : "-"}
                      </td>
                      <td
                        className={`px-4 py-3 font-semibold ${
                          match.away === "SF Nofels" ? "text-primary" : ""
                        }`}
                      >
                        {match.away}
                      </td>
                      <td className="px-4 py-3">
                        {match.day}, {formatDate(match.date)}
                      </td>
                      <td className="px-4 py-3">{match.time}</td>
                      <td className="px-4 py-3">{match.location}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

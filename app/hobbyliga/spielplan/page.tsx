"use client";

import { useState, useEffect, useMemo } from "react";
import Header from "../../components/Header";
import { supabase } from "@/lib/supabaseClient";

function isPast(matchDate: string, matchTime: string): boolean {
  if (!matchDate || !matchTime) return false;
  const matchDateTime = new Date(`${matchDate}T${matchTime}`);
  if (Number.isNaN(matchDateTime.getTime())) return false;
  return matchDateTime < new Date();
}

export default function Spielplan() {
  const [activeTab, setActiveTab] = useState<"all" | "sfn">("all");
  const [showPast, setShowPast] = useState(true);
  const [matchdays, setMatchdays] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const { data, error } = await supabase
        .from("matchdays")
        .select("id, name, matches(*)")
        .eq("season", 2026)   //Season filter, damit nicht alle Saisons geladen werden
        .order("id", { ascending: true });

      if (error) {
        console.error("Error loading matchdays:", error.message);
        return;
      }

      const mapped =
        data?.map((day: any) => ({
          id: day.id,
          name: day.name,
          matches:
            day.matches?.map((m: any) => ({
              home: m.home_team,
              away: m.away_team,
              day: m.day,
              date: m.date,
              time: m.time,
              location: m.location,
              score:
                m.home_score !== null && m.away_score !== null
                  ? { home: m.home_score, away: m.away_score }
                  : null,
            })) ?? [],
        })) ?? [];

      setMatchdays(mapped);
    }
    loadData();
  }, []);

  const sfNofelsMatches = useMemo(
    () =>
      matchdays.flatMap((md) =>
        md.matches
          .filter((m: any) => m.home === "SF Nofels" || m.away === "SF Nofels")
          .map((m: any) => ({ ...m, matchdayName: md.name }))
      ),
    [matchdays]
  );

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString ?? "";
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }

  const pillBase =
    "px-5 py-2 rounded-full font-medium transition border text-sm sm:text-base";
  const pillActive = "bg-primary text-white border-gray-300";
  const pillInactive = "bg-white text-black border-gray-300";

  return (
    <div className="min-h-screen bg-gray-50">
      <Header title="SPIELPLAN 2025" image="/headers/spielplan.webp" />

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Tabs & Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex w-full sm:w-auto gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("all")}
              className={`${pillBase} ${
                activeTab === "all" ? pillActive : pillInactive
              }`}
            >
              Gesamter Spielplan
            </button>
            <button
              onClick={() => setActiveTab("sfn")}
              className={`${pillBase} ${
                activeTab === "sfn" ? pillActive : pillInactive
              }`}
            >
              Nur SFN Spiele
            </button>
          </div>

          {/* Past toggle styled like pills */}
          <button
            onClick={() => setShowPast((p) => !p)}
            className={`${pillBase} ${
              showPast ? pillActive : pillInactive
            } shrink-0`}
          >
            {showPast
              ? "Vergangene Spiele ausblenden"
              : "Vergangene Spiele anzeigen"}
          </button>
        </div>

        {/* ===== MOBILE CARDS ===== */}
        {activeTab === "all" ? (
          <div className="sm:hidden space-y-6">
            {matchdays.map((matchday) => {
              const filtered = matchday.matches.filter(
                (m: any) => showPast || !isPast(m.date, m.time)
              );
              if (filtered.length === 0) return null;
              return (
                <section key={matchday.id} className="space-y-2">
                  <h2 className="text-lg font-semibold text-gray-800 bg-gray-200 rounded-md px-3 py-2">
                    {matchday.name}
                  </h2>

                  <ul className="grid gap-2">
                    {filtered.map((m: any, idx: number) => {
                      const past = isPast(m.date, m.time);
                      return (
                        <li
                          key={idx}
                          className={`rounded-xl bg-white shadow p-3 border ${
                            past ? "opacity-90" : ""
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 text-sm">
                                <span
                                  className={`font-semibold truncate max-w-[40vw] ${
                                    m.home === "SF Nofels" ? "text-primary" : ""
                                  }`}
                                  title={m.home}
                                >
                                  {m.home}
                                </span>
                                <span className="text-gray-400 shrink-0">vs</span>
                                <span
                                  className={`font-semibold truncate max-w-[40vw] ${
                                    m.away === "SF Nofels" ? "text-primary" : ""
                                  }`}
                                  title={m.away}
                                >
                                  {m.away}
                                </span>
                              </div>

                              <div className="mt-0.5 text-sm text-gray-600">
                                Ergebnis:{" "}
                                <strong>
                                  {m.score ? `${m.score.home} : ${m.score.away}` : "-"}
                                </strong>
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <div className="text-xs text-gray-500 leading-none">
                                {m.day || ""}
                              </div>
                              <div className="text-sm font-semibold leading-none">
                                {formatDate(m.date)}
                              </div>
                              <div className="text-xs text-gray-700 leading-none mt-1">
                                {m.time}
                              </div>
                            </div>
                          </div>

                          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-700">
                            <span>
                              Ort: <strong>{m.location || "-"}</strong>
                            </span>
                            {past && (
                              <span className="rounded-full text-xs px-2 py-0.5 bg-gray-100 border">
                                Vergangen
                              </span>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              );
            })}
          </div>
        ) : (
          <div className="sm:hidden">
            <ul className="grid gap-2">
              {sfNofelsMatches
                .filter((m: any) => showPast || !isPast(m.date, m.time))
                .map((m: any, idx: number) => {
                  const past = isPast(m.date, m.time);
                  return (
                    <li
                      key={idx}
                      className={`rounded-xl bg-white shadow p-3 border ${
                        past ? "opacity-90" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <div className="text-xs text-gray-500 mb-0.5">
                            {m.matchdayName}
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <span
                              className={`font-semibold truncate max-w-[40vw] ${
                                m.home === "SF Nofels" ? "text-primary" : ""
                              }`}
                              title={m.home}
                            >
                              {m.home}
                            </span>
                            <span className="text-gray-400 shrink-0">vs</span>
                            <span
                              className={`font-semibold truncate max-w-[40vw] ${
                                m.away === "SF Nofels" ? "text-primary" : ""
                              }`}
                              title={m.away}
                            >
                              {m.away}
                            </span>
                          </div>
                          <div className="mt-0.5 text-sm text-gray-600">
                            Ergebnis:{" "}
                            <strong>
                              {m.score ? `${m.score.home} : ${m.score.away}` : "-"}
                            </strong>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-xs text-gray-500 leading-none">
                            {m.day || ""}
                          </div>
                          <div className="text-sm font-semibold leading-none">
                            {formatDate(m.date)}
                          </div>
                          <div className="text-xs text-gray-700 leading-none mt-1">
                            {m.time}
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-700">
                        <span>
                          Ort: <strong>{m.location || "-"}</strong>
                        </span>
                        {past && (
                          <span className="rounded-full text-xs px-2 py-0.5 bg-gray-100 border">
                            Vergangen
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        )}

        {/* ===== DESKTOP/TABLES ===== */}
        {activeTab === "all" ? (
          <div className="hidden sm:block space-y-4">
            {matchdays.map((matchday) => {
              const filtered = matchday.matches.filter(
                (m: any) => showPast || !isPast(m.date, m.time)
              );
              if (filtered.length === 0) return null;
              return (
                <div key={matchday.id} className="space-y-2">
                  <h2 className="text-xl font-semibold text-gray-800 bg-gray-200 rounded-md px-4 py-2">
                    {matchday.name}
                  </h2>

                  <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                  <table className="min-w-[720px] w-full table-fixed text-sm">
                    <thead className="text-left text-gray-600 border-b">
                      <tr className="whitespace-nowrap">
                        {/* Add strict percentage widths that add up to 100% */}
                        <th className="px-4 py-3 w-[25%]">Heim</th>
                        <th className="px-4 py-3 w-[10%]">Ergebnis</th>
                        <th className="px-4 py-3 w-[25%]">Gast</th>
                        <th className="px-4 py-3 w-[15%]">Datum</th>
                        <th className="px-4 py-3 w-[10%]">Uhrzeit</th>
                        <th className="px-4 py-3 w-[15%]">Ort</th>
                      </tr>
                    </thead>
                      <tbody>
                        {filtered.map((m: any, idx: number) => (
                          <tr
                            key={idx}
                            className="even:bg-gray-50 border-b last:border-none"
                          >
                            <td
                              className={`px-4 py-3 font-semibold max-w-[280px] truncate ${
                                m.home === "SF Nofels" ? "text-primary" : ""
                              }`}
                              title={m.home}
                            >
                              {m.home}
                            </td>
                            <td className="px-4 py-3 text-gray-700">
                              {m.score ? `${m.score.home} : ${m.score.away}` : "-"}
                            </td>
                            <td
                              className={`px-4 py-3 font-semibold max-w-[280px] truncate ${
                                m.away === "SF Nofels" ? "text-primary" : ""
                              }`}
                              title={m.away}
                            >
                              {m.away}
                            </td>
                            <td className="px-4 py-3">
                              {m.day}, {formatDate(m.date)}
                            </td>
                            <td className="px-4 py-3">{m.time}</td>
                            <td className="px-4 py-3">{m.location}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="hidden sm:block">
            <div className="overflow-x-auto bg-white rounded-xl shadow-md">
              <table className="min-w-[760px] w-full table-auto text-sm">
                <thead className="text-left text-gray-600 border-b">
                  <tr className="whitespace-nowrap">
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
                    .filter((m: any) => showPast || !isPast(m.date, m.time))
                    .map((m: any, idx: number) => (
                      <tr
                        key={idx}
                        className="even:bg-gray-50 border-b last:border-none"
                      >
                        <td className="px-4 py-3 font-semibold">
                          {m.matchdayName}
                        </td>
                        <td
                          className={`px-4 py-3 font-semibold max-w-[240px] truncate ${
                            m.home === "SF Nofels" ? "text-primary" : ""
                          }`}
                          title={m.home}
                        >
                          {m.home}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {m.score ? `${m.score.home} : ${m.score.away}` : "-"}
                        </td>
                        <td
                          className={`px-4 py-3 font-semibold max-w-[240px] truncate ${
                            m.away === "SF Nofels" ? "text-primary" : ""
                          }`}
                          title={m.away}
                        >
                          {m.away}
                        </td>
                        <td className="px-4 py-3">
                          {m.day}, {formatDate(m.date)}
                        </td>
                        <td className="px-4 py-3">{m.time}</td>
                        <td className="px-4 py-3">{m.location}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

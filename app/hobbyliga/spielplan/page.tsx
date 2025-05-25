"use client";

import { useState } from "react";
import Image from "next/image";
import matchdaysData from "../../../data/spielplan2025.json";

// Hilfsfunktion zum Vergleichen mit aktuellem Datum
function isPast(matchDate: string, matchTime: string): boolean {
    const [day, month, year] = matchDate.split(".");
    const [hour, minute] = matchTime.split(":");
    const matchDateTime = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
    return matchDateTime < new Date();
}

export default function Spielplan() {
    const [activeTab, setActiveTab] = useState("all");
    const [showPast, setShowPast] = useState(false);

    const sfNofelsMatches = matchdaysData.matchdays.flatMap(matchday =>
        matchday.matches
            .filter(match => match.home === "SF Nofels" || match.away === "SF Nofels")
            .map(match => ({ ...match, matchdayName: matchday.name }))
    );

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b shadow-md">
                <div className="container mx-auto px-4 py-6 flex items-center gap-4">
                    <h1 className="text-3xl font-extrabold text-gray-800">HOBBYLIGA SPIELPLAN 2025</h1>
                </div>
            </div>

            {/* Tabs & Toggle */}
            <div className="container mx-auto px-4 py-6 space-y-6">
                <div className="flex gap-4">
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`px-5 py-2 rounded-full font-medium transition ${
                            activeTab === "all" ? "bg-black text-white" : "bg-white text-black border"
                        }`}
                    >
                        Gesamter Spielplan
                    </button>
                    <button
                        onClick={() => setActiveTab("sfn")}
                        className={`px-5 py-2 rounded-full font-medium transition ${
                            activeTab === "sfn" ? "bg-black text-white" : "bg-white text-black border"
                        }`}
                    >
                        Nur SFN Spiele
                    </button>
                </div>

                {/* Toggle vergangene Spiele */}
                <div className="text-right">
                    <button
                        onClick={() => setShowPast(!showPast)}
                        className="text-sm font-medium text-blue-600 hover:underline"
                    >
                        {showPast ? "Vergangene Spiele ausblenden" : "Vergangene Spiele anzeigen"}
                    </button>
                </div>

                {/* Matches */}
                {activeTab === "all" ? (
                    matchdaysData.matchdays.map(matchday => {
                        const filteredMatches = matchday.matches.filter(
                            match => showPast || !isPast(match.date, match.time)
                        );

                        if (filteredMatches.length === 0) return null;

                        return (
                            <div key={matchday.id} className="space-y-3">
                                <h2 className="text-xl font-semibold text-gray-800 bg-gray-200 rounded-md px-4 py-2">
                                    {matchday.name}
                                </h2>
                                <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                                    <table className="w-full table-fixed text-sm">
                                        <thead className="text-left text-gray-600 border-b">
                                        <tr>
                                            <th className="px-4 py-3 w-[16%]">Heim</th>
                                            <th className="px-4 py-3 w-[16%]">Gast</th>
                                            <th className="px-4 py-3 w-[20%]">Datum</th>
                                            <th className="px-4 py-3 w-[12%]">Uhrzeit</th>
                                            <th className="px-4 py-3 w-[20%]">Ort</th>
                                            <th className="px-4 py-3 w-[16%]">Bemerkung</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {filteredMatches.map((match, idx) => (
                                            <tr key={idx} className="even:bg-gray-50 border-b last:border-none">
                                                <td className="px-4 py-3 font-semibold w-[16%]">{match.home}</td>
                                                <td className="px-4 py-3 font-semibold w-[16%]">{match.away}</td>
                                                <td className="px-4 py-3 w-[20%]">{match.day}, {match.date}</td>
                                                <td className="px-4 py-3 w-[12%]">{match.time}</td>
                                                <td className="px-4 py-3 w-[20%]">{match.location}</td>
                                                <td className="px-4 py-3 text-gray-500 w-[16%]">{match.note}</td>
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
                        <table className="w-full table-auto text-sm">
                            <thead className="text-left text-gray-600 border-b">
                            <tr>
                                <th className="px-4 py-3">Spieltag</th>
                                <th className="px-4 py-3">Heim</th>
                                <th className="px-4 py-3">Gast</th>
                                <th className="px-4 py-3">Datum</th>
                                <th className="px-4 py-3">Uhrzeit</th>
                                <th className="px-4 py-3">Ort</th>
                                <th className="px-4 py-3">Bemerkung</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sfNofelsMatches
                                .filter(match => showPast || !isPast(match.date, match.time))
                                .map((match, index) => (
                                    <tr
                                        key={index}
                                        className="even:bg-gray-50 border-b last:border-none"
                                    >
                                        <td className="px-4 py-3 font-semibold">{match.matchdayName}</td>
                                        <td className={`px-4 py-3 font-semibold ${match.home === "SF Nofels" ? "text-red-600" : ""}`}>
                                            {match.home}
                                        </td>
                                        <td className={`px-4 py-3 font-semibold ${match.away === "SF Nofels" ? "text-red-600" : ""}`}>
                                            {match.away}
                                        </td>
                                        <td className="px-4 py-3">{match.day}, {match.date}</td>
                                        <td className="px-4 py-3">{match.time}</td>
                                        <td className="px-4 py-3">{match.location}</td>
                                        <td className="px-4 py-3 text-gray-500">{match.note}</td>
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

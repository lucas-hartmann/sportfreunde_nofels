"use client";

import Image from "next/image";
import Header from "../../components/Header";


const leagueData = [
    { platz: 1, club: "SF Nofels", spiele: 4, tore: 17, gegentore: 4, diff: 13, punkte: 12 },
    { platz: 2, club: "FC Viktorsberg", spiele: 4, tore: 21, gegentore: 13, diff: 8, punkte: 7 },
    { platz: 3, club: "FC Weiler", spiele: 4, tore: 15, gegentore: 13, diff: 2, punkte: 7 },
    { platz: 4, club: "RW Rankweil", spiele: 4, tore: 14, gegentore: 15, diff: -1, punkte: 4 },
    { platz: 5, club: "FC Fraxern", spiele: 4, tore: 7, gegentore: 17, diff: -10, punkte: 3 },
    { platz: 6, club: "FC Übersaxen", spiele: 4, tore: 7, gegentore: 19, diff: -12, punkte: 1 },
];

export default function Tabelle() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header title="HOBBYLIGA TABELLE 2025" />

            {/* Tabelle */}
            <div className="container mx-auto px-4 py-8">
                <div className="overflow-x-auto bg-white rounded-xl shadow-md">
                    <table className="w-full table-fixed text-sm">
                        <thead className="text-left text-gray-600 border-b">
                        <tr>
                            <th className="px-4 py-3 w-[10%]">Platz</th>
                            <th className="px-4 py-3 w-[30%]">Club</th>
                            <th className="px-4 py-3 w-[10%]">Sp</th>
                            <th className="px-4 py-3 w-[10%]">Tore</th>
                            <th className="px-4 py-3 w-[10%]">Geg</th>
                            <th className="px-4 py-3 w-[10%]">Diff</th>
                            <th className="px-4 py-3 w-[10%]">Pkt</th>
                        </tr>
                        </thead>
                        <tbody>
                        {leagueData.map((team, index) => (
                            <tr
                                key={index}
                                className="even:bg-gray-50 border-b last:border-none"
                            >
                                <td className="px-4 py-3 font-semibold">{team.platz}</td>
                                <td
                                    className={`px-4 py-3 font-semibold ${
                                        team.club === "SF Nofels" ? "text-red-600" : ""
                                    }`}
                                >
                                    {team.club}
                                </td>
                                <td className="px-4 py-3">{team.spiele}</td>
                                <td className="px-4 py-3">{team.tore}</td>
                                <td className="px-4 py-3">{team.gegentore}</td>
                                <td className="px-4 py-3">{team.diff}</td>
                                <td className="px-4 py-3 font-bold">{team.punkte}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

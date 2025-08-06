"use client";

import React from "react";
import ArticleCard, { Article } from "../components/ArticleCard";

const articles: Article[] = [
  {
    id: 1,
    title: "Saisonauftakt 2025",
    subtitle: "Mit vollem Einsatz ins Wochenende",
    excerpt: "Die Hobbyliga startet in die neue Saison: neue Teams, neue Gesichter und ein enger Spielplan.",
    date: "05. August 2025",
    images: [
      { src: "/bsc/images/pic1.jpg", alt: "Spieler am Ball" },
      { src: "/bsc/images/pic2.jpg", alt: "Torjubel" },
      { src: "/bsc/images/pic3.jpg", alt: "Publikum" },
    ],
  },
  {
    id: 2,
    title: "Teamvorstellungen",
    excerpt: "Kurzporträts der Mannschaften — wer spielt dieses Jahr oben mit?",
    date: "28. Juli 2025",
    images: [{ src: "/images/team.jpg", alt: "Mannschaftsbild" }],
  },
  {
    id: 3,
    title: "Historie",
    excerpt: "Ein Rückblick auf zehn Jahre Hobbyliga Vorderland.",
    date: "20. Juli 2025",
  },
];

export default function Articles() {
  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold">Alles über die Hobbyliga Vorderland</h1>

        {/* example: alternate image side for variety */}
        {articles.map((a, i) => (
          <ArticleCard key={a.id} article={a} imageSide={i % 2 === 0 ? "left" : "right"} defaultTitle="(Titel folgt)" />
        ))}
      </div>
    </main>
  );
}

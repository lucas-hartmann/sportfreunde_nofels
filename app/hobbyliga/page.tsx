// app/hobbyliga/page.tsx (App Router) or pages/hobbyliga.tsx (Pages Router)
"use client";

import React from "react";
import ArticleCard, { Article } from "../components/ArticleCard"; // adjust path if needed

const hobbyligaArticles: Article[] = [
  {
    id: 1,
    title: "Saison 2025 – Spielplan & Highlights",
    subtitle: "Das erwartet euch dieses Jahr",
    excerpt:
      "Die Hobbyliga Vorderland startet in eine spannende Saison mit neuen Teams, packenden Duellen und besonderen Events. Hier gibt es alle Infos zu den wichtigsten Spielen.",
    date: "05. August 2025",
    images: [
      { src: "/images/hobbyliga1.jpg", alt: "Spieler im Zweikampf" },
      { src: "/images/hobbyliga2.jpg", alt: "Jubelnde Mannschaft" },
      { src: "/images/hobbyliga3.jpg", alt: "Fußballplatz im Abendlicht" },
    ],
  },
  {
    id: 2,
    title: "Teamvorstellungen",
    excerpt:
      "Lerne alle Teams der Hobbyliga Vorderland kennen. Von erfahrenen Dauerbrennern bis zu brandneuen Mannschaften – hier erfährst du, wer in dieser Saison dabei ist.",
    date: "28. Juli 2025",
    images: [{ src: "/images/team.jpg", alt: "Gruppenfoto einer Mannschaft" }],
  },
  {
    id: 3,
    title: "Hobbyliga – Die Geschichte",
    excerpt:
      "Seit über zehn Jahren treffen sich Freizeitkicker aus der Region, um gemeinsam Fußball zu spielen und die Gemeinschaft zu stärken. Ein Rückblick auf die Highlights der letzten Jahre.",
    date: "20. Juli 2025",
  },
];

export default function Hobbyliga() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold mb-6">Alles über die Hobbyliga Vorderland</h1>

        {hobbyligaArticles.map((article) => (
          <ArticleCard key={article.id} article={article} defaultTitle="(Titel folgt)" />
        ))}
      </div>
    </main>
  );
}

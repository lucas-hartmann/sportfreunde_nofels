"use client";

import SignUpForm from "@/app/components/SignUpForm";
import React from "react";
import { Download } from "lucide-react";

const BeachsoccerCup = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="/headers/anmeldung.webp"
        >
          <source src="/bsc/background.MP4" type="video/mp4" />
          Dein Browser unterstützt das Video-Tag nicht.
        </video>

        <div className="absolute inset-0 bg-black/60"></div>

        <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight max-w-4xl">
          Beachsoccer Cup 2025
        </h1>
        <p className="relative z-10 mt-4 max-w-2xl text-base sm:text-lg md:text-xl text-white font-semibold drop-shadow-sm">
          Sonne, Sand und spannende Matches – das größte Beachsoccer-Turnier in
          Vorarlberg wartet auf dich!
        </p>
        <a
          href="#anmeldung"
          className="relative z-10 mt-10 inline-block border-2 border-white text-white font-semibold text-lg sm:text-xl py-3 px-6 sm:px-8 rounded-xl hover:bg-white hover:text-[#781c12] transition"
        >
          Jetzt Team anmelden
        </a>
      </section>

      {/* Info + Video Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="section-heading">Veranstaltungsdetails</h2>
          <p className="text-lg mb-4">
            <strong>Datum:</strong> 12. Juli 2025
            <br />
            <strong>Ort:</strong> Volksschule Nofels, Schmittengässele 28 – 6800
            Feldkirch
          </p>
          <p className="mb-6 leading-relaxed">
            Ein Tag voller Action, Sport und Spaß für alle Beachsoccer-Fans.
            Genieße spannende Matches, gute Musik, leckeres Essen und eine
            fantastische Atmosphäre direkt am Strand von Nofels.
          </p>

          <a
            href="/bsc/A4_Turnierausschreibung_2025.pdf"
            download
            className="inline-flex items-center gap-2 bg-[#781c12] text-white px-6 py-3 rounded-lg shadow-sm hover:bg-[#a62c1a] transition"
          >
            <span>Turnier Regeln Herunterladen</span>
            <Download className="w-5 h-5" />
          </a>
        </div>

        <div className="w-full rounded-lg overflow-hidden shadow-lg">
          <div className="relative pt-[56.25%]">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube-nocookie.com/embed/2Lh-3GtXjKo"
              title="Beachsoccer Cup 2022 Rückblick"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-gray-200 py-16 px-6">
        <h2 className="section-heading text-center md:text-left md:ml-12">
          Galerie
        </h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-lg overflow-hidden shadow-md">
              <img
                src={`/bsc/images/pic${i + 1}.jpg`}
                alt={`Beachsoccer Bild ${i + 1}`}
                className="w-full h-48 object-cover hover:scale-105 transition"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Highlights Section */}
      <section className="bg-white py-16 px-6">
        <h2 className="section-heading text-center md:text-left md:ml-12">
          Highlights
        </h2>
        <div className="max-w-4xl mx-auto space-y-6 text-base sm:text-lg text-gray-800">
          <p>⚽ <strong>Fußballturnier im Sand:</strong> Zeige Geschick und Teamgeist – spiele um den Sieg!</p>
          <p>🎈 <strong>Hüpfburg:</strong> Ein Paradies zum Austoben für Kinder.</p>
          <p>🎨 <strong>Kinderschminken:</strong> Werde zum Tiger, Fee oder Superheld!</p>
          <p>
            🍔 <strong>Leckeres vom Grill:</strong> Genieße Spezialitäten vom{" "}
            <a
              className="text-[#781c12] underline"
              href="https://meathouse.at/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Meathouse Schöch
            </a>.
          </p>
          <p>🏊 <strong>Pools zum Abkühlen:</strong> Erfrischung zwischen den Spielen.</p>
          <p>🌴 <strong>Strandliegen:</strong> Entspannen wie am brasilianischen Strand!</p>
          <p className="mt-6 font-semibold text-[#781c12] text-xl">
            🎁 Tolle Preise warten auf dich! Gewinne Strandzubehör, Staubsauger,
            Restaurant-Gutscheine u. v. m.!
          </p>
        </div>
      </section>

      {/* Sign-Up Form */}
      <section id="anmeldung" className="bg-gray-200 mx-auto py-16 px-6"> 
        <h2 className="section-heading text-center md:text-left md:ml-12 mb-8">
          Team Anmeldung
        </h2>
        <SignUpForm />
      </section>
    </div>
  );
};

export default BeachsoccerCup;

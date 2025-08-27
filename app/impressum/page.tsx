"use client";

import React from "react";
import Header from "../components/Header";

export default function ImpressumPage() {
  return (
    <span>
      {/* Header */}
      <Header title="Impressum" image="/headers/datenschutz.webp" />

      <main className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Impressum</h1>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Vereinsangaben</h2>
          <p>
            Sportfreunde Nofels <br />
            Nofels, Vorarlberg <br />
            Österreich
          </p>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold">Kontakt</h2>
          <p>
            E-Mail:{" "}
            <a
              href="mailto:info@sportfreunde-nofels.at"
              className="text-blue-600 hover:underline"
            >
              info@sportfreunde-nofels.at
            </a>
            <br />
            Telefon: +43 [Telefonnummer einfügen] 
          </p>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold">Vertretungsberechtigte Personen</h2>
          <p>
            Obmann: [Name einfügen] <br />
            Schriftführer: [Name einfügen] <br />
            Kassier: [Name einfügen]
          </p>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold">Haftungsausschluss</h2>
          <p>
            Trotz sorgfältiger inhaltlicher Kontrolle übernimmt der Verein keine
            Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten
            Seiten sind ausschließlich deren Betreiber verantwortlich.
          </p>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold">Technische Umsetzung</h2>
          <p>
            Die Website wurde von{" "}
            <a
              href="https://github.com/lucas-hartmann"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Lucas Hartmann
            </a>{" "}
            in Zusammenarbeit mit der Firma{" "}
            <a
              href="https://ghostbyte.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Ghostbyte GesbR
            </a>{" "}
            programmiert.
          </p>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold">Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            <br />
            <a
              href="https://ec.europa.eu/consumers/odr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              https://ec.europa.eu/consumers/odr/
            </a>
          </p>
        </section>
      </main>
    </span>
  );
}

"use client";

import React from "react";
import Header from "../components/Header";
import ContactsSection from "../components/ContactsSection";

export default function ImpressumPage() {
  return (
    <span>
      {/* Header */}
      <Header title="Impressum" image="/headers/datenschutz.webp" />

      <main className="ml-16 mr-16 mx-auto px-4 py-10 text-gray-800">
        <h1 className="text-3xl font-bold mb-6">Impressum</h1>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Vereinsangaben</h2>
          <p>
            Sportfreunde Nofels <br />
            6800 Feldkrich, Nofels<br />
            Österreich, Vorarlberg
          </p>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold">Kontakt</h2>

          <div className="-mt-22">
          <ContactsSection></ContactsSection>
          </div>
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
            entwickelt.
          </p>
        </section>
      </main>
    </span>
  );
}

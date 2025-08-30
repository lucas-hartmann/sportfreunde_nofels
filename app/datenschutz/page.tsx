"use client";

import React from "react";
import Header from "../components/Header";

export default function DatenschutzPage() {
  return (
    <span>
    {/* Header */}
    <Header title="Datenschutz" image="/headers/datenschutz.webp" />

    <main className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Datenschutzerklärung</h1>

      <section className="space-y-4">
        <p>
          Der Verein <strong>Sportfreunde Nofels</strong> nimmt den Schutz
          personenbezogener Daten sehr ernst. Diese Datenschutzerklärung klärt
          über die Art, den Umfang und den Zweck der Verarbeitung von
          personenbezogenen Daten auf, die im Rahmen der Nutzung unserer Website{" "}
          <a
            href="https://sportfreunde-nofels.at"
            className="text-blue-600 hover:underline"
          >
            sportfreunde-nofels.at
          </a>{" "}
          erhoben und verarbeitet werden.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">1. Verantwortlicher</h2>
        <p>
          Sportfreunde Nofels <br />
          Nofels, Vorarlberg <br />
          E-Mail:{" "}
          <a
            href="mailto:info@sportfreunde-nofels.at"
            className="text-blue-600 hover:underline"
          >
            info@sportfreunde-nofels.at
          </a>
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">2. Erhobene Daten</h2>
        <p>
          Auf unserer Website werden insbesondere folgende Daten und Inhalte
          veröffentlicht und verarbeitet:
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Bilder und Namen der Spielerinnen und Spieler</li>
          <li>Bilder vom Ligabetrieb der Hobbyliga Vorderland</li>
          <li>
            Fotos und Videos des jährlich veranstalteten Beachsoccer Cups (auch
            zu Werbezwecken)
          </li>
        </ul>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">3. Zwecke der Verarbeitung</h2>
        <p>
          Die Verarbeitung der genannten Daten erfolgt ausschließlich zur
          Öffentlichkeitsarbeit, zur Darstellung unseres Vereinslebens sowie zur
          Bewerbung und Dokumentation von Veranstaltungen (insbesondere des
          Beachsoccer Cups).
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">4. Rechtsgrundlagen</h2>
        <p>
          Rechtsgrundlage der Verarbeitung ist das berechtigte Interesse des
          Vereins gemäß Art. 6 Abs. 1 lit. f DSGVO an der Öffentlichkeitsarbeit
          und der Präsentation der Vereinsaktivitäten. Bei Veranstaltungen kann
          zusätzlich eine Einwilligung der betroffenen Personen eingeholt
          werden.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">5. Weitergabe von Daten</h2>
        <p>
          Eine Weitergabe der Daten an Dritte findet grundsätzlich nicht statt,
          es sei denn, es handelt sich um Veröffentlichungen im Rahmen unserer
          Vereins- und Öffentlichkeitsarbeit (z. B. auf der Website oder in
          sozialen Medien).
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">6. Speicherdauer</h2>
        <p>
          Bilder und Inhalte werden grundsätzlich zeitlich unbeschränkt
          veröffentlicht, soweit dies für die Darstellung der Vereinsaktivitäten
          sinnvoll ist. Auf Wunsch der betroffenen Person werden Inhalte
          selbstverständlich gelöscht.
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">7. Rechte der betroffenen Personen</h2>
        <p>Betroffene Personen haben insbesondere folgende Rechte:</p>
        <ul className="list-disc list-inside space-y-2">
          <li>Auskunft über die verarbeiteten personenbezogenen Daten</li>
          <li>Berichtigung unrichtiger Daten</li>
          <li>Löschung oder Einschränkung der Verarbeitung</li>
          <li>Widerspruch gegen die Verarbeitung</li>
        </ul>
        <p>
          Zur Wahrnehmung dieser Rechte genügt eine Kontaktaufnahme an{" "}
          <a
            href="mailto:info@sportfreunde-nofels.at"
            className="text-blue-600 hover:underline"
          >
            info@sportfreunde-nofels.at
          </a>
          .
        </p>
      </section>

      <section className="mt-8 space-y-4">
        <h2 className="text-2xl font-semibold">8. Technische Umsetzung</h2>
        <p>
          Die Website wurde von {" "}
          <a
            href="https://github.com/lucas-hartmann"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
          Lucas Hartmann
          </a>{" "} in
          Zusammenarbeit mit der Firma{" "}
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
    </main>
    </span>
  );
}

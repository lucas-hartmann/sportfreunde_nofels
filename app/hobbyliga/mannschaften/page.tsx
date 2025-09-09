"use client";

import React from "react";
import Image from "next/image";
import Header from "../../components/Header";
import { Club, mannschaften } from "@/data/mannschaften";

export default function ClubsPage() {
  const clubList: Club[] = mannschaften;
  const [openId, setOpenId] = React.useState<string | null>(null);

  return (
    <span>
      {/* Header */}
      <Header title="HOBBYLIGA MANNSCHAFTEN" image="/headers/mannschaften.webp" />

      <main className="min-h-screen bg-neutral-50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubList.map((club) => {
              const isOpen = openId === club.id;

              return (
                <div
                  key={club.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setOpenId(isOpen ? null : club.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setOpenId(isOpen ? null : club.id);
                    }
                  }}
                  className="block rounded-2xl bg-white shadow-xs hover:shadow-lg transition-shadow border border-neutral-100 overflow-hidden flex flex-col focus:outline-none focus:ring-2 focus:ring-primary-500/30"
                  aria-expanded={isOpen}
                  aria-label={`${club.name} Karte um Beschreibung zu ${isOpen ? "verbergen" : "anzeigen"}`}
                >
                  {/* Top section */}
                  <div className="flex flex-col items-center p-4 gap-3">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 flex items-center justify-center">
                      <Image
                        src={club.logo}
                        alt={`${club.name} Logo`}
                        fill
                        sizes="80px"
                        style={{ objectFit: "contain" }}
                      />
                    </div>

                    <h2 className="text-lg font-medium text-center">{club.name}</h2>
                    <p className="text-sm text-neutral-600 text-center">{club.description}</p>

                    {club.website && (
                      <a
                        href={club.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${club.name} Website öffnen`}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-2 text-sm text-primary-600 hover:underline"
                      >
                        Zur Website →
                      </a>
                    )}
                  </div>

                  {/* Toggleable description */}
                  {club.text && (
                    <div
                      className={`px-4 pb-4 text-sm text-neutral-600 transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      {club.text}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="border-t border-neutral-100 px-4 py-3 text-xs text-neutral-500 text-center">
                    Karte klicken für Beschreibung
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      </main>
    </span>
  );
}


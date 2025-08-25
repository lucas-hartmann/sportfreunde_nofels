"use client";

import React from "react";
import Image from "next/image";
import Header from "../../components/Header";
import { Club, mannschaften } from "@/data/mannschaften";

export default function ClubsPage() {
  const clubList: Club[] = mannschaften;

  return (
    <span>
      {/* Header */}
      <Header title="HOBBYLIGA MANNSCHAFTEN" image="/bsc/background.JPG" />

      <main className="min-h-screen bg-neutral-50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubList.map((club) => {
              const CardInner = (
                <div className="group block rounded-2xl bg-white shadow-xs hover:shadow-lg transition-shadow border border-neutral-100 overflow-hidden flex flex-col">
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
                      <span className="mt-2 text-sm text-primary-600">
                        Zur Website ↗
                      </span>
                    )}
                  </div>

                  {/* Hover text only for this card */}
                  {club.text && (
                    <div className="px-4 pb-4 text-sm text-neutral-600 transition-all duration-500 ease-in-out max-h-0 opacity-0 group-hover:max-h-[1000px] group-hover:opacity-100 overflow-hidden">
                      {club.text}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="border-t border-neutral-100 px-4 py-3 text-xs text-neutral-500 text-center">
                    Klicke um die Vereinsseite in einem neuen Tab zu öffnen
                  </div>
                </div>
              );

              return club.website ? (
                <a
                  key={club.id}
                  href={club.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${club.name} Website öffnen`}
                >
                  {CardInner}
                </a>
              ) : (
                <div key={club.id} aria-label={`${club.name} (keine Website)`}>
                  {CardInner}
                </div>
              );
            })}
          </section>
        </div>
      </main>
    </span>
  );
}

'use client';

import React from 'react';
import Image from 'next/image';
import Header from '../../components/Header';
import clubs from '../../../data/mannschaften.json';

type Club = {
    id: string;
    name: string;
    logo: string;
    description: string;
    website: string;
};

export default function ClubsPage() {

    const clubList: Club[] = clubs as unknown as Club[];

    return (
        <span>
      {/* Header */}
            <Header title="HOBBYLIGA MANNSCHAFTEN" />
      <main className="min-h-screen bg-neutral-50 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubList.map((club) => {
                const CardInner = (
                    <div className="group block rounded-2xl bg-white shadow-sm hover:shadow-lg transition-shadow border border-neutral-100 overflow-hidden">
                        <div className="flex items-center gap-4 p-4">
                            <div className="flex-shrink-0">
                                <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 flex items-center justify-center">
                                    <Image
                                        src={club.logo}
                                        alt={`${club.name} Logo`}
                                        fill
                                        sizes="80px"
                                        style={{ objectFit: 'contain' }}
                                    />
                                </div>
                            </div>

                            <div className="flex-1">
                                <h2 className="text-lg font-medium">{club.name}</h2>
                                <p className="text-sm text-neutral-600 mt-1">{club.description}</p>
                            </div>

                            <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-sm text-primary-600">Zur Website ↗</span>
                            </div>
                        </div>

                        <div className="border-t border-neutral-100 px-4 py-3 text-xs text-neutral-500">
                            Klick öffnet die Vereinsseite in einem neuen Tab
                        </div>
                    </div>
                );

                // Wenn website vorhanden -> <a>, sonst nur <div>
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

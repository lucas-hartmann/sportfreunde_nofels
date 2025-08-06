"use client";

import Image from "next/image";
import { useState } from "react";
import playersData from "../../../data/spieler.json";

type Player = {
  name: string;
  number: number;
  position: string;
  since: string;
  isVFV?: boolean;
  isNachmeldung?: boolean;
  image?: string;
};

/* Per-player image component with its own fallback state */
function PlayerImage({ src, alt }: { src?: string; alt: string }) {
  const defaultSrc = "/spieler/player-placeholder.png";
  const [imgSrc, setImgSrc] = useState(src ?? defaultSrc);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={120}
      height={120}
      className="rounded-full border-2 border-gray-200"
      onError={() => {
        // Next/Image forwards the onError to the underlying <img>, so this should work
        if (imgSrc !== defaultSrc) setImgSrc(defaultSrc);
      }}
    />
  );
}

export default function Spielerliste() {
  const players: Player[] = playersData.players;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-md">
        <div className="container mx-auto px-4 py-6 flex items-center gap-4">
          <h1 className="text-3xl font-extrabold text-gray-800">MANNSCHAFT - SF NOFELS</h1>
        </div>
      </div>

      {/* Spieler Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {players.map((player) => (
            <div
              key={`${player.number}-${player.name}`} // more stable than idx
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center relative hover:shadow-xl transition"
            >
              {/* Nummer oben links */}
              <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-0.5 rounded-full">
                #{player.number}
              </span>

              {/* Player image — uses player.image or fallback */}
              <PlayerImage src={player.image} alt={player.name} />

              {/* Name */}
              <h2 className="mt-4 text-lg font-semibold text-gray-800">{player.name}</h2>

              {/* Position */}
              <p className="text-sm text-gray-600">{player.position}</p>

              {/* Im Verein seit */}
              <p className="text-xs text-gray-500 mt-1">Im Verein seit {player.since}</p>

              {/* Badges */}
              <div className="flex gap-2 mt-3 flex-wrap justify-center">
                {player.isVFV && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">VFV Spieler</span>
                )}
                {player.isNachmeldung && (
                  <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                    Nachmeldung (ab 8. Runde)
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
    
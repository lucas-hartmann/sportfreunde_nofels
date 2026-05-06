import Image from "next/image";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import { mannschaften } from "@/data/mannschaften";
import Headline from "./Headline";

// Typen basierend auf der neuen API
type APIMatch = {
  id: string;
  match_date: string; // ISO String
  venue: string;
  home_team: { name: string; logo_url: string | null };
  away_team: { name: string; logo_url: string | null };
  home_score: number | null;
  away_score: number | null;
};

function getClubLogo(teamName: string): string {
  const club = mannschaften.find((club) => club.name === teamName);
  return club ? club.logo : "/logos/sfn_logo.webp";
}

async function getNextMatch() {
  const SFN_ID = "912f92a9-c735-4fe0-b790-cdd4a634ab10";
  
  try {
    // Wir nutzen den API-Endpunkt direkt für Nofels
    const res = await fetch(
      `https://fpiylhqnexlnlxketmzk.supabase.co/functions/v1/public-api/schedule?team=${SFN_ID}`,
      { next: { revalidate: 3600 } } // Cache für 1 Stunde
    );
    const data = await res.json();
    const schedule: APIMatch[] = data.schedule || [];

    // Das aktuelle Datum (für Server-Side Rendering nutzen wir das echte "jetzt")
    const now = new Date();

    // Finde das erste Spiel, dessen Datum in der Zukunft liegt
    const upcoming = schedule
      .filter((m) => new Date(m.match_date) > now)
      .sort((a, b) => new Date(a.match_date).getTime() - new Date(b.match_date).getTime());

    return upcoming.length > 0 ? upcoming[0] : null;
  } catch (error) {
    console.error("Error fetching next match:", error);
    return null;
  }
}

export default async function NextMatchSection() {
  const nextMatch = await getNextMatch();

  if (!nextMatch) return null;

  const matchDate = new Date(nextMatch.match_date);
  
  const formattedDate = matchDate.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const formattedTime = matchDate.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const dayName = matchDate.toLocaleDateString("de-DE", { weekday: "long" });

  return (
    <section className="flex flex-col items-center my-20 px-6 space-y-6 text-center">
      <Headline
        pill="Nächstes Spiel"
        blackLine="Nächstes Spiel der"
        redLine="Sportfreunde Nofels"
        description="Unterstütze unsere Mannschaft beim nächsten Spiel und erlebe Fußball-Emotion pur."
      />

      <div className="bg-white w-full max-w-2xl py-10 rounded-xl shadow-2xl px-10 md:px-20 mt-6 border border-gray-50">
        <div className="flex justify-between items-center gap-4">
          {/* Heimteam */}
          <div className="flex flex-col items-center flex-1">
            <div className="relative w-20 h-20 mb-3">
              <Image
                src={getClubLogo(nextMatch.home_team.name)}
                fill
                className="object-contain"
                alt={nextMatch.home_team.name}
              />
            </div>
            <span className="font-bold text-sm md:text-base leading-tight h-10 flex items-center">
              {nextMatch.home_team.name}
            </span>
          </div>

          <span className="text-primary text-3xl md:text-4xl font-black italic">VS</span>

          {/* Gastteam */}
          <div className="flex flex-col items-center flex-1">
            <div className="relative w-20 h-20 mb-3">
              <Image
                src={getClubLogo(nextMatch.away_team.name)}
                fill
                className="object-contain"
                alt={nextMatch.away_team.name}
              />
            </div>
            <span className="font-bold text-sm md:text-base leading-tight h-10 flex items-center">
              {nextMatch.away_team.name}
            </span>
          </div>
        </div>

        <div className="flex flex-col items-start space-y-4 mt-10 max-w-xs mx-auto">
          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-2 rounded-lg">
              <CalendarIcon className="text-primary w-5 h-5" />
            </div>
            <span className="font-semibold text-gray-700">
              {dayName}, {formattedDate}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-2 rounded-lg">
              <ClockIcon className="text-primary w-5 h-5" />
            </div>
            <span className="font-semibold text-gray-700">
              {formattedTime} Uhr
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-primary/10 p-2 rounded-lg">
              <MapPinIcon className="text-primary w-5 h-5" />
            </div>
            <span className="font-semibold text-gray-700 text-left">
              {nextMatch.venue}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
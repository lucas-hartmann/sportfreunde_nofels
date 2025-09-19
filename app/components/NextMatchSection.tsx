import Image from "next/image";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import { mannschaften } from "@/data/mannschaften";
import { supabaseServer } from "@/lib/supabaseServerClient";
import Headline from "./Headline";

type DBMatch = {
  home_team: string;
  away_team: string;
  day: string | null;
  date: string | null; // ISO date (YYYY-MM-DD)
  time: string | null; // HH:MM
  location: string | null;
};

function getClubLogo(teamName: string): string {
  const club = mannschaften.find((club) => club.name === teamName);
  return club ? club.logo : "/logos/default_logo.webp";
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return dateString;
  return d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

async function getNextMatchFromSupabase() {
  const { data, error } = await supabaseServer
    .from("matches")
    .select("home_team, away_team, day, date, time, location")
    .or("home_team.eq.SF Nofels,away_team.eq.SF Nofels");

  if (error || !data) return null;

  // const now = new Date();
  const now = new Date("2025-09-14T09:48:12.702Z");

  const upcoming = (data as DBMatch[])
    .map((m) => {
      const isoDate = m.date ?? "";
      const time = m.time ?? "00:00";
      const dt = isoDate ? new Date(`${isoDate}T${time}`) : null;
      return { ...m, dt } as DBMatch & { dt: Date | null };
    })
    .filter((m) => m.dt && m.dt > now)
    .sort((a, b) => a.dt!.getTime() - b.dt!.getTime());

  if (upcoming.length === 0) return null;

  const m = upcoming[0];
  return {
    home: m.home_team,
    away: m.away_team,
    day: m.day ?? "",
    date: m.date ?? "",
    time: m.time ?? "",
    location: m.location ?? "",
  } as {
    home: string;
    away: string;
    day: string;
    date: string;
    time: string;
    location: string;
  };
}

export default async function NextMatchSection() {
  const nextMatch = await getNextMatchFromSupabase();

  if (!nextMatch) return null;

  return (
    <section className="flex flex-col items-center my-20 px-6 space-y-6 text-center">
      <Headline
        pill="Nächstes Spiel"
        blackLine="Nächstes Spiel der"
        redLine="Sportfreunde Nofels"
        description={
          "Unterstuetze unsere Mannschaft beim naechsten Spiel und erlebe Fussball-Emotion pur."
        }
      />

      <div className="bg-white w-full max-w-2xl py-10 rounded-xl shadow-2xl px-10 md:px-20 mt-6">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-center">
            <Image
              src={getClubLogo(nextMatch.home)}
              width={80}
              height={80}
              className="w-20 h-20"
              alt={nextMatch.home}
            />
            <span className="font-bold mt-3">{nextMatch.home}</span>
          </div>

          <span className="text-primary text-4xl font-black">VS</span>

          <div className="flex flex-col items-center">
            <Image
              src={getClubLogo(nextMatch.away)}
              width={80}
              height={80}
              className="w-20 h-20"
              alt={nextMatch.away}
            />
            <span className="font-bold mt-3">{nextMatch.away}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-6 mt-10">
          <div className="flex space-x-3">
            <CalendarIcon className="text-primary" />
            <span className="font-semibold">
              {nextMatch.day}
              {nextMatch.day ? ", " : ""}
              {formatDate(nextMatch.date)}
            </span>
          </div>

          <div className="flex space-x-3">
            <ClockIcon className="text-primary" />
            <span className="font-semibold">
              {nextMatch.time ? `${nextMatch.time} Uhr` : ""}
            </span>
          </div>

          <div className="flex space-x-3">
            <MapPinIcon className="text-primary" />
            <span className="font-semibold">{nextMatch.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

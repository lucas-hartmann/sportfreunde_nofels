import Image from "next/image";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import { matchdays } from "@/data/spielplan2025";
import { mannschaften } from "@/data/mannschaften";
import Headline from "./Headline";

function getNextMatch() {
  const now = new Date();

  for (const matchday of matchdays) {
    for (const match of matchday.matches) {
      const [day, month, year] = match.date.split(".");
      const [hours, minutes] = match.time.split(":");
      const matchDate = new Date(`${year}-${month}-${day}T${hours}:${minutes}`);

      const isNofelsPlaying =
        match.home === "SF Nofels" || match.away === "SF Nofels";

      if (matchDate > now && isNofelsPlaying) {
        return { ...match, datetime: matchDate };
      }
    }
  }

  return null;
}

function getClubLogo(teamName: string): string {
  const club = mannschaften.find((club) => club.name === teamName);
  return club ? club.logo : "/logos/default_logo.webp";
}

export default function NextMatchSection() {
  const nextMatch = getNextMatch();

  if (!nextMatch) return null;

  return (
    <section className="flex flex-col items-center my-30 px-6 space-y-6 text-center">
      <Headline
        pill="Nächstes Spiel"
        blackLine="Nächstes Spiel der"
        redLine="Sportfreunde Nofels"
        description="Unterstütze unsere Mannschaft beim nächsten Heimspiel und erlebe
        Fußball-Emotion pur."
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
            />{" "}
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
            />{" "}
            <span className="font-bold mt-3">{nextMatch.away}</span>
          </div>
        </div>

        <div className="flex flex-col space-y-6 mt-10">
          <div className="flex space-x-3">
            <CalendarIcon className="text-primary" />
            <span className="font-semibold">
              {nextMatch.day}, {nextMatch.date}
            </span>
          </div>

          <div className="flex space-x-3">
            <ClockIcon className="text-primary" />
            <span className="font-semibold">{nextMatch.time} Uhr</span>
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

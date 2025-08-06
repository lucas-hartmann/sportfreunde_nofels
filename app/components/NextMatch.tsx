import Image from "next/image";
import matchdays from "../../data/spielplan2025.json";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";

function getNextMatch() {
  const now = new Date();

  for (const matchday of matchdays.matchdays) {
    for (const match of matchday.matches) {
      const [day, month, year] = match.date.split(".");
      const [hours, minutes] = match.time.split(":");
      const matchDate = new Date(`${year}-${month}-${day}T${hours}:${minutes}`);

      if (matchDate > now) {
        return { ...match, datetime: matchDate };
      }
    }
  }

  return null;
}

export default function NextMatch() {
  const nextMatch = getNextMatch();

  if (!nextMatch) return null;

  return (
    <section className="flex flex-col items-center my-30 space-y-6 text-center">
      <div className="border border-gray-400 rounded-full py-1 px-2 text-primary text-sm font-semibold">
        Nächstes Spiel
      </div>

      <h2 className="text-4xl md:text-6xl font-bold">
        Komm vorbei und
        <span className="block text-primary">feier mit uns! 🎊</span>
      </h2>

      <p className="text-gray-600 text-xl">
        Gute Stimmung, kalte Getränke und hoffentlich ein paar Tore - was will
        man mehr?
      </p>

      <div className="bg-white w-full max-w-2xl py-10 rounded-xl shadow-2xl px-20 mt-6">
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <Image src="/logos/sfn_logo.webp" width={60} height={60} alt="" />
            <span className="font-bold mt-3">{nextMatch.home}</span>
          </div>

          <span className="text-primary text-4xl font-black">VS</span>

          <div className="flex flex-col items-center">
            <Image src="/logos/sfn_logo.webp" width={60} height={60} alt="" />
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

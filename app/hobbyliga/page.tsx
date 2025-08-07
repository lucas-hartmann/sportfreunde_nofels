import Header from "../components/Header";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRightIcon,
  BarChart3Icon,
  CalendarCheckIcon,
  Icon,
  UsersIcon,
} from "lucide-react";

export default function Hobbyliga() {
  const navItems = [
    {
      title: "Spielplan",
      href: "/hobbyliga/spielplan",
      image: "/bsc/background.JPG",
      icon: CalendarCheckIcon,
      description:
        "Alle Spiele der aktuellen Saison im Überblick. Termine, Gegner und Spielorte auf einen Blick.",
      cta: "Zum Spielplan",
    },
    {
      title: "Tabelle",
      href: "/hobbyliga/tabelle",
      image: "/bsc/background.JPG",
      icon: BarChart3Icon,
      description:
        "Aktuelle Tabellensituation mit Punkten, Toren und Platzierungen aller Teams.",
      cta: "Zur Tabelle",
    },
    {
      title: "Mannschaften",
      href: "/hobbyliga/mannschaften",
      image: "/bsc/background.JPG",
      icon: UsersIcon,
      description: "Alle teilnehmenden Teams der Hobbyliga",
      cta: "Zu den Mannschaften",
    },
  ];

  return (
    <span>
      <Header title="HOBBYLIGA" image="/bsc/background.JPG" />
      <main className="container mx-auto px-4 py-8">
        <section className="my-16 px-6 space-y-6">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="border border-gray-400 rounded-full py-1 px-2 text-primary text-sm font-semibold">
              Hobbyliga Übersicht
            </div>

            <h2 className="text-4xl md:text-6xl font-bold">
              Alles rund um unsere
              <span className="block text-primary">Hobbyliga</span>
            </h2>

            <p className="text-gray-600 text-xl">
              Hier finden Sie alle wichtigen Informationen zu Spielplan, Tabelle
              und den teilnehmenden Mannschaften
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
            {navItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="flex flex-col rounded-lg shadow-md bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="aspect-video w-full relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-t-lg aspe"
                  />
                </div>

                <div className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2.5 mb-3">
                      <item.icon
                        className="text-primary"
                        size={26}
                        strokeWidth={2.2}
                      />
                      <h3 className="text-xl font-bold text-black">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-3">{item.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">
                      {item.cta}
                    </span>
                    <ArrowRightIcon className="text-primary w-5 h-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </span>
  );
}

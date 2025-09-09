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
import NavCardGrid, { NavCard } from "../components/NavCardGrid";
import Headline from "../components/Headline";

export default function Hobbyliga() {
  const navItems: NavCard[] = [
    {
      title: "Spielplan",
      href: "/hobbyliga/spielplan",
      image: "/headers/spielplan.webp",
      icon: CalendarCheckIcon,
      description:
        "Alle Spiele der aktuellen Saison im Überblick. Termine, Gegner und Spielorte auf einen Blick.",
      cta: "Zum Spielplan",
    },
    {
      title: "Tabelle",
      href: "/hobbyliga/tabelle",
      image: "/headers/tabelle.webp",
      icon: BarChart3Icon,
      description:
        "Aktuelle Tabellensituation mit Punkten, Toren und Platzierungen aller Teams.",
      cta: "Zur Tabelle",
    },
    {
      title: "Mannschaften",
      href: "/hobbyliga/mannschaften",
      image: "/headers/mannschaften.webp",
      icon: UsersIcon,
      description: "Alle teilnehmenden Teams der Hobbyliga",
      cta: "Zu den Mannschaften",
    },
  ];

  return (
    <span>
      <Header title="HOBBYLIGA" image="/headers/hobbyliga.webp" />
      <main className="container mx-auto px-4 py-30">
        <Headline
          pill="Hobbyliga Übersicht"
          blackLine="Alles rund um unsere"
          redLine="Hobbyliga"
          description="Hier finden Sie alle wichtigen Informationen zu Spielplan, Tabelle und den teilnehmenden Mannschaften"
        />
        <NavCardGrid items={navItems} />
      </main>
    </span>
  );
}

import NavCardGrid, { NavCard } from "../components/NavCardGrid";
import Header from "../components/Header";
import { CalendarCheckIcon, MapPinIcon, UsersIcon } from "lucide-react";
import Headline from "../components/Headline";

export default function Verein() {
  const navItems: NavCard[] = [
    {
      title: "Geschichte",
      href: "/verein/geschichte",
      image: "/headers/geschichte.webp",
      icon: CalendarCheckIcon,
      description: "",
      cta: "Zum Geschichte",
    },
    {
      title: "Spieler",
      href: "/verein/spieler",
      image: "/headers/spieler.webp",
      icon: UsersIcon,
      description: "",
      cta: "Zu den Spielern",
    },
    {
      title: "Altherren",
      href: "/verein/altherren",
      image: "/headers/altherren.webp",
      icon: UsersIcon,
      description: "",
      cta: "Zu den Altherren",
    },
    {
      title: "Sportplatz",
      href: "/verein/sportplatz",
      image: "/headers/sportplatz.webp",
      icon: MapPinIcon,
      description: "",
      cta: "Zum Sportplatz",
    },
  ];

  return (
    <span>
      {/* Header */}
      <Header title="VEREIN" image="/headers/verein.webp" />
      <main className="container mx-auto px-4 py-30">
        <Headline
          pill="Verein Übersicht"
          blackLine="Fußball mit Herz"
          redLine="seit 1988"
          description="Lernen Sie die Sportfreunde Nofels näher kennen - mit Informationen zur Geschichte, unseren Werten und dem Vereinsleben."
        />

        <NavCardGrid items={navItems} />
      </main>
    </span>
  );
}

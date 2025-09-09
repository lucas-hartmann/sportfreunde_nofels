import NavCardGrid, { NavCard } from "../components/NavCardGrid";
import Header from "../components/Header";
import { CalendarIcon, NewspaperIcon } from "lucide-react";
import Headline from "../components/Headline";

export default function Beachsoccer() {
  const navItems: NavCard[] = [
    {
      title: "Anmeldung für 2026",
      href: "/beachsoccer/2026",
      image: "/headers/anmeldung.webp",
      icon: CalendarIcon,
      description: "",
      cta: "Zur Anmeldung",
    },
    {
      title: "Bericht für 2025",
      href: "/beachsoccer/2025",
      image: "/headers/bsc25.webp",
      icon: NewspaperIcon,
      description: "",
      cta: "Zum Bericht",
    },
    {
      title: "Bericht für 2024",
      href: "/beachsoccer/2024",
      image: "/headers/bsc24.webp",
      icon: NewspaperIcon,
      description: "",
      cta: "Zum Bericht",
    },
  ];

  return (
    <span>
      <Header title="BEACHSOCCER" image="/headers/beachsoccer.webp" />
      <main className="container mx-auto px-4 py-30">
        <Headline
          pill="Beachsoccer Übersicht"
          blackLine="Beachsoccer bei den"
          redLine="Sportfreunden"
          description="Alles Wissenswerte rund um das traditionelle Beachsoccer-Turnier der Sportfreunde Nofels"
        />

        <NavCardGrid items={navItems} />
      </main>
    </span>
  );
}

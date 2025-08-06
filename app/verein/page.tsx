import NavCardGrid from "../components/NavCardGrid";
import Header from "../components/Header";

export default function Verein() {
  const navItems = [
    { title: "Geschichte", href: "/verein/geschichte"},
    { title: "Spieler", href: "/verein/spieler"},
    { title: "Altherren", href: "/verein/altherren"},
    { title: "Sportplatz", href: "/verein/sportplatz"},
  ];

  return (
    <span>
    {/* Header */}
    <Header title="VEREIN" />
    <main className="container mx-auto px-4 py-8">
      <NavCardGrid title="Navigation" items={navItems} />
    </main>
    </span>
  );
}

import NavCardGrid from "../components/NavCardGrid";
import Header from "../components/Header";

export default function Beachsoccer() {
  const navItems = [
    { title: "Anmeldung für 2026", href: "/beachsoccer/26"},
    { title: "Bericht 2025", href: "/beachsoccer/25"},
    { title: "Bericht 2024", href: "/hobbyliga/24"},
  ];

  return (
    <span>
    {/* Header */}
    <Header title="BEACHSOCCER" />
    <main className="container mx-auto px-4 py-8">
      <NavCardGrid title="Navigation" items={navItems} />
    </main>
    </span>
  );
}

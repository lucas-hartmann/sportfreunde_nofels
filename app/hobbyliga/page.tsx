import NavCardGrid from "../components/NavCardGrid";
import Header from "../components/Header";

export default function Hobbyliga() {
  const navItems = [
    {
      title: "Spielplan",
      href: "/hobbyliga/spielplan",
      description: "Tournament info",
    },
    {
      title: "Tabelle",
      href: "/hobbyliga/tabelle",
      description: "Standings and results",
    },
    {
      title: "Mannschaften",
      href: "/hobbyliga/mannschaften",
      description: "Team details",
    },
  ];

  return (
    <span>
      {/* Header */}
      <Header title="HOBBYLIGA" image="/bsc/background.JPG" />
      <main className="container mx-auto px-4 py-8">
        <NavCardGrid title="Navigation" items={navItems} />
      </main>
    </span>
  );
}

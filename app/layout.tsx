import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Geist } from "next/font/google";
import { Metadata } from "next";
import NavbarNew from "./components/NavbarNew";

const font = Geist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Sportfreunde Nofels",
  description:
    "Hier findest du alles über unseren Verein, die Hobbyliga, unsere Mannschaft und den legendären BeachsoccerCup!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={font.className}>
        <NavbarNew />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

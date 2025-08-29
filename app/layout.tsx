import "./globals.css";
import Footer from "./components/Footer";
import { Geist, Montserrat, Alfa_Slab_One } from "next/font/google";
import { Metadata } from "next";
import Navbar from "./components/Navbar";

const font = Geist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const alfa = Alfa_Slab_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-alfa",
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
      <body className={`${montserrat.variable} ${alfa.variable} ${font.className}`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

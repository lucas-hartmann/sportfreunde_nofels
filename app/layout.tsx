import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Head from "next/head";
import { Geist } from "next/font/google";
import { Metadata } from "next";

const font = Geist({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Sportfreunde Nofels",
  description:
    "Hier findest du alles über unseren Verein, die Hobbyliga, unsere Mannschaft und den legendären BeachsoccerCup!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
      <html lang="de" className="bg-primary">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={font.className}>
        <Navbar />

        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

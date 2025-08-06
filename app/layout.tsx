import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Head from "next/head";
import { Inter } from "next/font/google";

const font = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
});

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
      <body  className={font.className}>
        <Navbar />

        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import Image from "next/image";
import QuoteSection from "./components/QuoteSection";
import NextMatchSection from "./components/NextMatchSection";
import SponsorsSection from "./components/SponsorsSection";
import ContactsSection from "./components/ContactsSection";

export default function Home() {
  return (
    <main>
      <section className="h-screen flex relative items-center justify-center">
        <Image
          className="absolute inset-0 w-full h-full object-cover"
          src="/bsc/background.JPG"
          fill
          alt=""
        ></Image>

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="space-y-4 flex flex-col items-center text-center z-20">
          <Image
            src={"/logos/sfn_logo.webp"}
            className="h-40 w-40"
            width={120}
            height={120}
            alt="Sportfreunde Nofels Logo"
          />
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white">
            SPORTFREUNDE
            <span className="block text-primary drop-shadow-lg">NOFELS</span>
          </h1>
        </div>
      </section>

      <NextMatchSection />

      <QuoteSection />

      <ContactsSection />

      <SponsorsSection />
    </main>
  );
}

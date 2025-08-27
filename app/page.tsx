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
            src="/logos/sfn_logo.webp"
            alt="Sportfreunde Nofels Logo"
            width={100}
            height={100}
            className="w-36 h-36 sm:w-40 sm:h-40"
          />
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white">
            SPORTFREUNDE
            <span className="block text-primary drop-shadow-lg">NOFELS</span>
          </h1>
        </div>
      </section>

      <NextMatchSection />

      <QuoteSection />

      <h2 className="text-center font-bold text-4xl mt-20">
        Unsere Kontakte
      </h2>
      <ContactsSection />

      <SponsorsSection />
    </main>
  );
}

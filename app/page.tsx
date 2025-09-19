import Image from "next/image";
import QuoteSection from "./components/QuoteSection";
import NextMatchSection from "./components/NextMatchSection";
import SponsorsSection from "./components/SponsorsSection";
import ContactsSection from "./components/ContactsSection";

export default function Home() {
  return (
    <main>

      <section className="h-screen flex relative items-center justify-center">
        {/* <Image
          className="absolute inset-0 w-full h-full object-cover"
          src="/headers/bsc23.webp"
          fill
          alt=""
        ></Image> */}
        <Image
        src="/headers/bsc23.webp"           // or a static import: import hero from '@/public/hero.jpg'
        alt=""
        fill                      // behaves like a background-cover
        className="object-cover"
        priority                  // preloads the image
        fetchPriority="high"      // hints the browser as well
        placeholder="blur"        // instant blur-up
        blurDataURL="data:image/jpeg;base64,..." // optional: Next auto-fills if you static-import
        sizes="100vw"             // critical for the right size at each breakpoint
      />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="space-y-4 flex flex-col items-center text-center z-20">
          <Image
            src="/logos/sfn_logo.webp"
            alt="Sportfreunde Nofels Logo"
            width={100}
            height={100}
            className="w-36 h-36 sm:w-40 sm:h-40"
          />
        <h1 className="font-alfa text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white">
          SPORTFREUNDE{" "}<br></br>
          <span className="text-primary drop-shadow-lg">NOFELS</span>
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

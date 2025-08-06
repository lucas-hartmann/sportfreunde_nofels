import Image from "next/image";
import NextMatch from "./components/NextMatch";

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

        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="space-y-4 flex flex-col items-center text-center z-20">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white">
            SPORTFREUNDE
            <span className="block text-primary drop-shadow-lg">NOFELS</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
            Hier findest du alles über unseren Verein, die Hobbyliga, unsere
            Mannschaft und den legendären BeachsoccerCup!
          </p>
        </div>
      </section>

      <NextMatch />
    </main>
  );
}

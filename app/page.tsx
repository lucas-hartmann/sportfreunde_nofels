export default function Home() {
  return (
    <main>
      <section
        className="h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/bsc/background.JPG')" }}
      >
        {" "}
        <div className="space-y-4 flex flex-col items-center text-center">
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

      <section className="flex flex-col items-center my-30 space-y-6">
        <div className="border border-gray-400 rounded-full py-1 px-2 text-primary text-sm font-semibold">
          Nächstes Heimspiel
        </div>

        <h2 className="text-4xl font-bold">Nächstes Heimspiel</h2>
        <p className="text-gray-700">Unterstütze unsere Mannschaft beim nächsten Heimspiel</p>
      </section>
    </main>
  );
}

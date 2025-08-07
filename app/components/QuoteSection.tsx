import Image from "next/image";

export default function QuoteSection() {
  return (
    <section className="py-30 bg-gray-200">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <blockquote className="text-2xl md:text-3xl font-light text-gray-500 text-center">
          "Bei einem Fußballspiel verkompliziert sich alles durch die Anwesenheit der gegnerischen Kantine."
        </blockquote>

        <div className="flex items-center justify-center space-x-5 mt-8">
          <Image
            src="/logos/sfn_logo.webp"
            width={60}
            height={60}
            className="w-15 h-15 rounded-full"
            alt=""
          />

          <div>
            <p className="font-bold text-lg">Martin Malin</p>
            <span className="text-gray-500">Obmann Sportfreunde Nofels</span>
          </div>
        </div>
      </div>
    </section>
  );
}

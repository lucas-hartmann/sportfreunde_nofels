import Image from "next/image";

export default function QuoteSection() {
  return (
    <section className="py-20 bg-gray-200 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <blockquote className="text-2xl md:text-3xl font-light text-gray-500 text-center">
          "Bei einem Fußballspiel verkompliziert sich alles durch die
          Anwesenheit der gegnerischen Kantine."
        </blockquote>

        <div className="flex items-center justify-center space-x-5 mt-8">
          <Image
            src="/headers/zitat_cropped.webp"
            width={80}
            height={80}
            className="w-20 h-20 rounded-full"
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

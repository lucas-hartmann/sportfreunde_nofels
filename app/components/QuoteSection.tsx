import Image from "next/image";

export default function QuoteSection() {
  return (
    <section className="py-30 bg-gray-200">
     <div className="max-w-4xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center md:space-x-10">
      <div className="flex items-center justify-center space-x-5 mt-8 md:mt-0 md:w-1/2">
        <Image
          src="/headers/zitat.webp"
          width={300}
          height={300}
          className="w-50 h-50 rounded-full"
          alt=""
        />
        <div>
          <p className="font-bold text-lg">Martin Malin</p>
          <span className="text-gray-500">Obmann Sportfreunde Nofels</span>
        </div>
      </div>
      <blockquote className="text-2xl md:text-3xl font-light text-gray-500 text-center md:text-left md:w-1/2">
        "Bei einem Fußballspiel verkompliziert sich alles durch die Anwesenheit der gegnerischen Kantine."
      </blockquote>
    </div>
    </section>
  );
}

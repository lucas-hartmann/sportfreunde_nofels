import Image from "next/image";

export default function SponsorsSection() {
  return (
    <section className="max-w-4xl mx-auto px-6 md:px-10 my-40 flex flex-col items-center text-center space-y-5">
      <div className="border border-gray-400 rounded-full py-1 px-2 text-primary text-sm font-semibold">
        Unsere Partner
      </div>

      <h2 className="text-4xl md:text-6xl font-bold">
        Hauptsponsoren &<span className="block text-primary">Unterstützer</span>
      </h2>

      <p className="text-gray-600 text-xl">
        Ohne unsere treuen Partner wäre vieles nicht möglich. Herzlichen Dank
        für die Unterstützung!
      </p>
    </section>
  );
}

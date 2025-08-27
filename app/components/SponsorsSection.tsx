import Image from "next/image";

type Sponsor = {
  name: string;
  image: string;
  link: string;
};

const sponsors: Sponsor[] = [
  { name: "Schöch's Meathouse GmbH", image: "/sponsors/meathouse.webp", link: "https://meathouse.at/" },
  { name: "Kapfgarage Lampert & Dolinar OG", image: "/sponsors/kapfgarage.webp", link: "https://findmywerkstatt.at/Werkstatt/Kapfgarage-Lampert-Dolinar/4352" },
  { name: "Raiffeisenbank Montfort", image: "/sponsors/raiffeisen.webp", link: "https://www.raiffeisen.at/vorarlberg/raiba-montfort/de/privatkunden.html" },
  { name: "AM Physio", image: "/sponsors/amphysio.webp", link: "https://amphysio.at/" },
  { name: "SuperGau GmbH", image: "/sponsors/supergau.webp", link: "https://www.supergau.com/" },
  { name: "Gasthaus Sterna Bangs", image: "/sponsors/sternabangs.webp", link: "https://www.gasthaus-stern.at/" },
];

export default function SponsorsSection() {
  return (
    <section className="my-20 bg-gray-200 py-10">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        {/* <h2 className="text-2xl font-semibold text-center mb-10">Unsere Sponsoren</h2> */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-8 place-items-center">
          {sponsors.map((sponsor, idx) => (
            <a 
              key={idx} 
              href={sponsor.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-transform duration-200 hover:scale-105"
            >
              <Image
                src={sponsor.image}
                alt={sponsor.name}
                width={150}
                height={80}
                className="object-contain h-16 w-auto"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

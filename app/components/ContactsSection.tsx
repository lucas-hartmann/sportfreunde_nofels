import { ArrowRightIcon, LucideIcon, MailIcon, PhoneIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type Contact = {
  name: string;
  responsibility: string;
  image: string;
  phone: string;
  email: string;
};

export default function ContactsSection() {
  const items: Contact[] = [
    {
      name: "Martin Malin",
      responsibility: "Obmann",
      image: "/bsc/images/pic1.jpg",
      phone: "+12345",
      email: "lul@lul.lul",
    },
    {
      name: "Mathias Mätzler",
      responsibility: "Sportlicher Leiter",
      image: "/bsc/images/pic1.jpg",
      phone: "+12345",
      email: "lul@lul.lul",
    },
    {
      name: "Emanuel Reiner",
      responsibility: "Kassier",
      image: "/bsc/images/pic1.jpg",
      phone: "+12345",
      email: "lul@lul.lul",
    },
    {
      name: "Simon Strauß",
      responsibility: "Hüslewart",
      image: "/bsc/images/pic1.jpg",
      phone: "+12345",
      email: "lul@lul.lul",
    },
  ];

  return (
    <div className="container mx-auto px-4 mt-30">
      <h2 className="text-center font-bold text-4xl mb-6 mt-10">
        Unsere Kontakte
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex flex-col items-center rounded-2xl shadow-md bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-200"
          >
            <div className="w-[60%] mt-[15%]">
              <div className="aspect-square relative w-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
            </div>

            <div className="p-6 flex flex-col justify-between items-center text-center h-full">
              <h3 className="text-xl font-bold">{item.name}</h3>
              <span className="text-primary font-bold">
                {item.responsibility}
              </span>
              <div className="flex items-center gap-2.5 mt-6">
                <PhoneIcon
                  className="text-primary"
                  size={24}
                  strokeWidth={2.2}
                />
                <span className="text-sm font-bold text-black">
                  {item.phone}
                </span>
              </div>

              <div className="flex items-center gap-2.5 mt-6">
                <MailIcon
                  className="text-primary"
                  size={24}
                  strokeWidth={2.2}
                />
                <span className="text-sm font-bold text-black">
                  {item.email}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

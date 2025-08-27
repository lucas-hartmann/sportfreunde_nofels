"use client";

import { MailIcon, PhoneIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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
      phone: "+43 664 8256184",
      email: "martin.malin@icloud.com",
    },
    {
      name: "Mathias Mätzler",
      responsibility: "Sportlicher Leiter",
      image: "/spieler/mathias_maetzler.webp",
      phone: "+43 699 12908389",
      email: "mathias.maetzler@schachermayer.at",
    },
    {
      name: "Emanuel Reiner",
      responsibility: "Kassier",
      image: "/bsc/images/pic1.jpg",
      phone: "+43 664 9710470",
      email: "reiner.e@hotmail.com",
    },
    {
      name: "Simon Strauß",
      responsibility: "Hüslewart",
      image: "/bsc/images/pic1.jpg",
      phone: "+43 677 18044150",
      email: "strauss.simon@hotmail.com",
    },
  ];

  // track which field was copied
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);

    // reset after 2s
    setTimeout(() => setCopied(null), 2000);
  };

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

              {/* Phone */}
              <div
                className="relative flex items-center gap-2.5 mt-6 cursor-pointer group"
                onClick={() => handleCopy(item.phone, item.phone)}
              >
                <PhoneIcon className="text-primary" size={24} strokeWidth={2.2} />
                <span className="text-sm font-bold text-black">{item.phone}</span>

                {/* Tooltip */}
                <span
                  className={`absolute top-full mt-2 px-2 py-1 text-xs rounded-md shadow-md transition 
                    ${copied === item.phone ? "bg-green-500 text-white" : "bg-gray-800 text-white"}
                    opacity-0 group-hover:opacity-100`}
                >
                  {copied === item.phone ? "Kopiert!" : "Klicken um zu Kopieren"}
                  {/* Tooltip arrow */}
                  <span
                    className={`absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 
                      ${copied === item.phone ? "bg-green-500" : "bg-gray-800"}`}
                  />
                </span>
              </div>

              {/* Email */}
              <div
                className="relative flex items-center gap-2.5 mt-6 cursor-pointer group"
                onClick={() => handleCopy(item.email, item.email)}
              >
                <MailIcon className="text-primary flex-shrink-0" size={24} strokeWidth={2.2} />
                
                {/* Wrap text + tooltip so tooltip doesn't push layout */}
                <div className="relative flex flex-col items-center">
                  <span className="text-sm font-bold text-black text-center break-normal [overflow-wrap:break-word]">
                    {item.email.replace(/[@.]/g, (match) => match + "\u200B")}
                  </span>

                  {/* Tooltip */}
                  <span
                    className={`absolute top-full mt-2 px-2 py-1 text-xs rounded-md shadow-md transition 
                      ${copied === item.email ? "bg-green-500 text-white" : "bg-gray-800 text-white"}
                      opacity-0 group-hover:opacity-100 whitespace-nowrap`}
                  >
                    {copied === item.email ? "Kopiert!" : "Klicken um zu Kopieren"}
                    {/* Tooltip arrow */}
                    <span
                      className={`absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 
                        ${copied === item.email ? "bg-green-500" : "bg-gray-800"}`}
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

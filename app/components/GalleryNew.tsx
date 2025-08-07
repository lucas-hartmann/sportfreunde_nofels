"use client";

import Image from "next/image";
import { useState } from "react";
import FullImageModal from "./FullImageModal";

type ImageType = {
  url: string;
  full: string;
  alt: string;
};

export default function Gallery({ images }: { images: ImageType[] }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 p-2">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="relative overflow-hidden cursor-pointer"
            onClick={() => setSelected(idx)}
          >
            <Image
              src={img.url}
              alt={img.alt}
              width={320}
              height={240}
              className="object-cover w-full h-full transform hover:scale-105 transition duration-200"
            />
          </div>
        ))}
      </div>

      {selected !== null && (
        <FullImageModal
          image={images[selected]}
          onClose={() => setSelected(null)}
          onNext={() => setSelected((selected + 1) % images.length)}
          onPrev={() =>
            setSelected((selected - 1 + images.length) % images.length)
          }
        />
      )}
    </>
  );
}

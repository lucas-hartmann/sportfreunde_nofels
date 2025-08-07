"use client";

import { useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";

type Props = {
  image: { full: string; alt: string };
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
};

export default function FullImageModal({
  image,
  onClose,
  onNext,
  onPrev,
}: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNext, onPrev]);

  const download = async () => {
    const res = await fetch(image.full);
    const blob = await res.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${image.alt}.jpg`;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <button
        onClick={onClose}
        className="absolute top-5 right-5 text-white text-3xl"
      >
        ×
      </button>
      <button
        onClick={onPrev}
        className="absolute left-5 text-white focus:outline-none"
      >
        <ArrowLeft size={32} />
      </button>
      <Image
        src={image.full}
        alt={image.alt}
        width={1600}
        height={900}
        className="max-h-[80vh] object-contain"
        priority
      />
      <button
        onClick={onNext}
        className="absolute right-5 text-white focus:outline-none"
      >
        <ArrowRight size={32} />
      </button>
      <button
        onClick={download}
        className="absolute bottom-5 right-5 flex items-center gap-2 bg-white px-3 py-1 rounded"
      >
        <Download size={20} /> Download
      </button>
    </div>
  );
}

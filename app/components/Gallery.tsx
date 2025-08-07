"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, Download } from "lucide-react";

type ImageType = {
  url: string; // scaled down
  full: string; // original
  alt: string;
};

export default function Gallery() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight" && selectedIndex < images.length - 1) {
        setSelectedIndex(selectedIndex + 1);
      } else if (e.key === "ArrowLeft" && selectedIndex > 0) {
        setSelectedIndex(selectedIndex - 1);
      } else if (e.key === "Escape") {
        setSelectedIndex(null);
      }
    },
    [selectedIndex, images.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  const downloadImage = async (url: string, alt: string) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${alt}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <p className="p-4 text-gray-600">Loading gallery...</p>;
  if (images.length === 0)
    return (
      <p className="p-4 text-red-500">
        No images found. Check your Cloudinary folder name.
      </p>
    );

  return (
    <>
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 p-4 space-y-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="break-inside-avoid cursor-pointer transition-transform hover:scale-105"
            onClick={() => setSelectedIndex(index)}
          >
            <Image
              src={image.url}
              alt={image.alt}
              width={600}
              height={Math.floor(Math.random() * 300 + 200)}
              className="rounded-lg w-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full">
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold hover:text-gray-300"
              onClick={() => setSelectedIndex(null)}
              aria-label="Close"
            >
              &times;
            </button>

            <Image
              src={images[selectedIndex].full}
              alt={images[selectedIndex].alt}
              width={1600}
              height={900}
              className="w-full h-auto max-h-[80vh] rounded-lg object-contain"
              priority
            />

            <div className="flex justify-between mt-4 px-4">
              <button
                onClick={() =>
                  selectedIndex > 0 && setSelectedIndex(selectedIndex - 1)
                }
                className="text-white"
              >
                <ArrowLeft className="w-8 h-8" />
              </button>
              <button
                onClick={() =>
                  selectedIndex < images.length - 1 &&
                  setSelectedIndex(selectedIndex + 1)
                }
                className="text-white"
              >
                <ArrowRight className="w-8 h-8" />
              </button>
              <button
                onClick={() =>
                  downloadImage(
                    images[selectedIndex].full,
                    images[selectedIndex].alt
                  )
                }
                className="text-white"
              >
                <Download className="w-8 h-8" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

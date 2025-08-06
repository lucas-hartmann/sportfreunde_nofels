// components/ArticleCard.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";

export type GalleryImage = { src: string; alt?: string };
export type Article = {
  id: string | number;
  title?: string;
  subtitle?: string;
  excerpt?: string;
  images?: GalleryImage[];
  date?: string;
  href?: string;
};

type Props = {
  article: Article;
  defaultTitle?: string;
  imageSide?: "left" | "right"; // gallery on left or right on wide screens
};

export default function ArticleCard({ article, defaultTitle = "Untitled", imageSide = "left" }: Props) {
  const { title, subtitle, excerpt, images = [], date, href = "#" } = article;
  const [active, setActive] = useState(0);

  const hasImages = images.length > 0;

  return (
    <article
      className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden"
      aria-labelledby={`article-${article.id}-title`}
    >
      <div
        className={`md:flex md:items-stretch ${
          imageSide === "right" ? "md:flex-row-reverse" : "md:flex-row"
        }`}
      >
        {/* Gallery column */}
        {hasImages && (
          <div className="md:w-1/3 w-full bg-gray-50 p-4 flex flex-col gap-3">
            {/* Main image */}
            <div className="rounded-lg overflow-hidden h-48 md:h-full md:min-h-[220px] relative">
              <Image
                src={images[active].src}
                alt={images[active].alt ?? ""}
                fill
                style={{ objectFit: "cover" }}
                sizes="(min-width: 768px) 33vw, 100vw"
                className="rounded-lg"
              />
            </div>

            {/* Thumbnails (if >1) */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 mt-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`rounded-md overflow-hidden border ${
                      i === active ? "ring-2 ring-black" : "border-gray-200"
                    }`}
                    aria-label={`Bild ${i + 1}`}
                  >
                    <div className="relative w-full h-16">
                      <Image src={img.src} alt={img.alt ?? ""} fill style={{ objectFit: "cover" }} />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Text column */}
        <div className={`p-6 ${hasImages ? "md:w-2/3" : "w-full"}`}>
          <header className="flex items-start justify-between gap-4">
            <div>
              <h2 id={`article-${article.id}-title`} className="text-lg md:text-xl font-semibold text-gray-800">
                {title ?? defaultTitle}
              </h2>
              {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
              {date && <time className="block mt-2 text-xs text-gray-400">{date}</time>}
            </div>

            {/* optional CTA */}
            <div className="hidden md:flex md:items-center">
              <a
                href={href}
                className="px-4 py-2 rounded-full border text-sm font-medium transition hover:bg-black hover:text-white"
                onClick={(e) => href === "#" && e.preventDefault()}
              >
                Mehr lesen
              </a>
            </div>
          </header>

          <div className="mt-4 text-gray-700 leading-relaxed">
            {excerpt ? <p>{excerpt}</p> : <p className="text-gray-400 italic">Kein Vorspann vorhanden.</p>}
          </div>

          {/* mobile CTA under text */}
          <div className="mt-5 md:hidden">
            <a
              href={href}
              className="inline-block px-4 py-2 rounded-full border text-sm font-medium transition hover:bg-black hover:text-white"
              onClick={(e) => href === "#" && e.preventDefault()}
            >
              Mehr lesen
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

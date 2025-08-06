// components/ArticleCard.tsx
import React from "react";
import Image from "next/image";

export type Article = {
  id: string | number;
  title?: string;
  subtitle?: string;
  excerpt?: string;
  images?: { src: string; alt?: string }[];
  date?: string;
  className?: string;
};

type Props = {
  article: Article;
  defaultTitle?: string;
};

export default function ArticleCard({ article, defaultTitle = "Untitled Article" }: Props) {
  const { title, subtitle, excerpt, images = [], date } = article;

  return (
    <article
      className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden transition-shadow hover:shadow-lg ${article.className ?? ""}`}
      aria-labelledby={`article-${article.id}-title`}
    >
      <header className="px-6 py-4">
        <h2 id={`article-${article.id}-title`} className="text-xl md:text-2xl font-semibold leading-tight">
          {title ?? defaultTitle}
        </h2>
        {subtitle && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        {date && <time className="block mt-2 text-xs text-gray-400">{date}</time>}
      </header>

      {/* Images area */}
      {images.length === 0 ? null : (
        <div className="px-6 pb-6">
          {/* 1 image: large hero; 2 images: side-by-side; 3+ images: grid responsive */}
          {images.length === 1 && (
            <div className="w-full rounded-xl overflow-hidden">
              <Image src={images[0].src} alt={images[0].alt ?? ""} width={1200} height={700} className="w-full h-auto object-cover" />
            </div>
          )}

          {images.length === 2 && (
            <div className="grid grid-cols-2 gap-3">
              {images.map((img, i) => (
                <div key={i} className="rounded-lg overflow-hidden">
                  <Image src={img.src} alt={img.alt ?? ""} width={600} height={400} className="w-full h-48 md:h-56 object-cover" />
                </div>
              ))}
            </div>
          )}

          {images.length >= 3 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Show first image bigger on left for medium screens */}
              <div className="sm:col-span-2 rounded-lg overflow-hidden">
                <Image src={images[0].src} alt={images[0].alt ?? ""} width={1000} height={700} className="w-full h-56 md:h-72 object-cover" />
              </div>
              <div className="grid grid-rows-2 gap-3">
                {images.slice(1, 3).map((img, i) => (
                  <div key={i} className="rounded-lg overflow-hidden">
                    <Image src={img.src} alt={img.alt ?? ""} width={800} height={400} className="w-full h-28 md:h-36 object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Text content */}
      <div className="px-6 pb-6">
        {excerpt && <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{excerpt}</p>}
        <div className="mt-4 flex items-center justify-between">
          <a
            className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
            href="#"
            onClick={(e) => e.preventDefault()}
          >
            Read more →
          </a>
          <div className="text-xs text-gray-400">• {images.length} image{images.length !== 1 ? "s" : ""}</div>
        </div>
      </div>
    </article>
  );
}

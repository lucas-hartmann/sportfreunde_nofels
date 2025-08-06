"use client";

import Link from "next/link";

export type NavCard = {
  title: string;
  href: string;
  description?: string;
};

type Props = {
  items: NavCard[];
  title?: string;
};

export default function NavCardGrid({ items, title }: Props) {
  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>
      )}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg hover:border-blue-500 transition-all"
          >
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
              {item.title}
            </h3>
            {item.description && (
              <p className="mt-2 text-sm text-gray-500">{item.description}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";

const Dropdown = ({
                      title,
                      items,
                  }: {
    title: string;
    items: { name: string; href: string }[];
}) => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="px-4 py-2 text-white hover:text-gray-200 transition"
                aria-expanded={open}
                aria-haspopup="true"
            >
                {title}
            </button>

            {open && (
                <div className="absolute left-0 mt-1 bg-white border rounded-md shadow-lg z-50 min-w-[10rem]">
                    {items.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="block px-4 py-2 text-black hover:bg-gray-100 transition"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default function Navbar() {
    return (
        <nav className="bg-primary text-white px-6 py-3 shadow-md">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                    <Link href="/" className="flex items-center space-x-3">
                        <Image
                            src="/logos/sfn.png"
                            alt="Sportfreunde Nofels Logo"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <span className="text-xl font-bold">Sportfreunde Nofels</span>
                    </Link>

                    <Dropdown
                        title="BeachsoccerCup"
                        items={[
                            { name: "2025", href: "/beachsoccer/2025" },
                            { name: "2024", href: "/beachsoccer/2024" },
                        ]}
                    />
                    <Dropdown
                        title="Mannschaft"
                        items={[
                            { name: "Geschichte", href: "/mannschaft/geschichte" },
                            { name: "Spieler", href: "/mannschaft/spieler" },
                            { name: "Altherren", href: "/mannschaft/altherren" },
                            { name: "Sportplatz", href: "/mannschaft/sportplatz" },
                        ]}
                    />
                    <Dropdown
                        title="Hobbyliga"
                        items={[
                            { name: "Tabelle", href: "/hobbyliga/tabelle" },
                            { name: "Spielplan", href: "/hobbyliga/spielplan" },
                        ]}
                    />
                </div>
            </div>
        </nav>
    );
}

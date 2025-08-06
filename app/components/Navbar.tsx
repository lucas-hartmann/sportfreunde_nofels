"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X } from "lucide-react"; // Or use Heroicons or your own icons

const Dropdown = ({
                      title,
                      items,
                      isMobile = false,
                      onItemClick = () => {},
                  }: {
    title: string;
    items: { name: string; href: string }[];
    isMobile?: boolean;
    onItemClick?: () => void;
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

    if (isMobile) {
        return (
            <div>
                <button
                    onClick={() => setOpen(!open)}
                    className="w-full text-left px-4 py-2 text-white hover:text-gray-200 transition"
                >
                    {title}
                </button>
                {open && (
                    <div className="pl-4">
                        {items.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={onItemClick}
                                className="block px-4 py-2 text-white hover:bg-primary/20 transition"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="px-4 py-2 text-white hover:text-gray-200 transition"
            >
                {title}
            </button>
            {open && (
                <div className="absolute left-0 mt-1 bg-white border rounded-md shadow-lg z-50 min-w-40">
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
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="bg-primary text-white px-6 py-3 shadow-md">
            <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-3">
                    <Image
                        src="/logos/sfn_logo.webp"
                        alt="Sportfreunde Nofels Logo"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <span className="text-xl font-bold">Sportfreunde Nofels</span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center space-x-6">
                    <Dropdown
                        title="Beachsoccer Cup"
                        items={[
                            { name: "Anmeldung 2026", href: "/beachsoccer/2026" },
                            { name: "2025", href: "/beachsoccer/2025" },
                            { name: "2024", href: "/beachsoccer/2024" },
                        ]}
                    />
                    <Dropdown
                        title="Verein"
                        items={[
                            { name: "Geschichte", href: "/verein/geschichte" },
                            { name: "Spieler", href: "/verein/spieler" },
                            { name: "Altherren", href: "/verein/altherren" },
                            { name: "Sportplatz", href: "/verein/sportplatz" },
                        ]}
                    />
                    <Dropdown
                        title="Hobbyliga"
                        items={[
                            { name: "Mannschaften", href: "/hobbyliga/mannschaften" },
                            { name: "Tabelle", href: "/hobbyliga/tabelle" },
                            { name: "Spielplan", href: "/hobbyliga/spielplan" },
                        ]}
                    />
                </div>

                {/* Mobile menu button */}
                <button
                    className="md:hidden"
                    onClick={() => setMenuOpen((prev) => !prev)}
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile dropdown nav */}
            {menuOpen && (
                <div className="mt-4 md:hidden flex flex-col space-y-2">
                    <Dropdown
                        title="BeachsoccerCup"
                        items={[
                            { name: "2025", href: "/beachsoccer/2025" },
                            { name: "2024", href: "/beachsoccer/2024" },
                        ]}
                        isMobile
                        onItemClick={() => setMenuOpen(false)}
                    />
                    <Dropdown
                        title="Mannschaft"
                        items={[
                            { name: "Geschichte", href: "/mannschaft/geschichte" },
                            { name: "Spieler", href: "/mannschaft/spieler" },
                            { name: "Altherren", href: "/mannschaft/altherren" },
                            { name: "Sportplatz", href: "/mannschaft/sportplatz" },
                        ]}
                        isMobile
                        onItemClick={() => setMenuOpen(false)}
                    />
                    <Dropdown
                        title="Hobbyliga"
                        items={[
                            { name: "Tabelle", href: "/hobbyliga/tabelle" },
                            { name: "Spielplan", href: "/hobbyliga/spielplan" },
                        ]}
                        isMobile
                        onItemClick={() => setMenuOpen(false)}
                    />
                </div>
            )}
        </nav>
    );
}

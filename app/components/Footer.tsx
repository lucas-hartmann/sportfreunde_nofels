import { Github, Heart } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-20 pb-3">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Brand column */}
          <div className="md:w-1/3">
            <div className="flex items-center gap-3 mb-8">
              <img
                src="/logos/sfn_logo.webp"
                height={60}
                width={60}
                alt="Pixelix logo"
              />
              <h3 className="text-3xl font-bold">Sportfreunde Nofels</h3>
            </div>
            <div className="flex gap-6 text-2xl">
              <Link
                href="https://www.instagram.com/sportfreunde_nofels"
                target="_blank"
                aria-label="Instagram"
              >
                <FaInstagram className="text-white hover:text-pink-400 transition-colors" />
              </Link>
              <Link
                href="https://www.facebook.com/Sportfreunde.Nofels/?locale=de_DE"
                target="_blank"
                aria-label="Facebook"
              >
                <FaFacebook className="text-white hover:text-blue-400 transition-colors" />
              </Link>
              <Link
                href="https://www.youtube.com/@sportfreunde_nofels"
                target="_blank"
                aria-label="YouTube"
              >
                <FaYoutube className="text-white hover:text-red-400 transition-colors" />
              </Link>
            </div>
          </div>

          {/* Links columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:w-2/3">
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">
                Beachsoccer Cup
              </h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/beachsoccer/2026"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    Anmeldung 2026
                  </Link>
                </li>
                <li>
                  <Link
                    href="/beachsoccer/2025"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    Bericht 2025
                  </Link>
                </li>
                <li>
                  <Link
                    href="/beachsoccer/2024"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    Bericht 2024
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6">Verein</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/verein/geschichte"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    Geschichte
                  </Link>
                </li>
                <li>
                  <Link
                    href="/verein/spieler"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    Spieler
                  </Link>
                </li>
                <li>
                  <Link
                    href="/verein/altherren"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    Altherren
                  </Link>
                </li>
                <li>
                  <Link
                    href="/verein/sportplatz"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    Sportplatz
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-6 text-white">Hobbyliga</h3>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/hobbyliga/mannschaften"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    Mannschaften
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hobbyliga/tabelle"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    Tabelle
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hobbyliga/spielplan"
                    className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    Spielplan
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 pb-10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-center text-sm md:text-left">
            Copyright © 2025 - Sportfreunde Nofels
          </p>
          <div className="flex gap-6">
            <Link
              href="/datenschutz"
              className="text-sm text-white hover:text-gray-400 transition-colors"
            >
              Datenschutz
            </Link>
            <Link
              href="/impressum"
              className="text-sm text-white hover:text-gray-400 transition-colors"
            >
              Impressum
            </Link>
          </div>
        </div>

        {/* <div className="w-full flex justify-center">
          <div className="p-3 text-center flex">
            Entwickelt von{" "}
            <Link href="https://ghostbyte.dev">
              <strong className="font-bold text-white mx-1">Lucas</strong>
            </Link>{" "}
            in Zusammenarbeit mit
            <Link href="https://ghostbyte.dev">
              <strong className="font-bold text-white ml-1">Ghostbyte</strong>
            </Link>
          </div>
        </div> */}
      </div>
    </footer>
  );
}

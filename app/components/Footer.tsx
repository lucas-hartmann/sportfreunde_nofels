import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-primary text-white py-8 border-t border-white/20">
            <div className="max-w-screen-xl mx-auto px-4 flex flex-col items-center text-center space-y-4 sm:space-y-6">
                <p className="text-sm">&copy; {new Date().getFullYear()} Sportfreunde Nofels</p>

                <div className="flex flex-wrap justify-center gap-6 text-2xl">
                    <Link href="https://www.instagram.com/sportfreunde_nofels" target="_blank" aria-label="Instagram">
                        <FaInstagram className="hover:text-pink-400 transition-colors" />
                    </Link>
                    <Link href="https://www.facebook.com/Sportfreunde.Nofels/?locale=de_DE" target="_blank" aria-label="Facebook">
                        <FaFacebook className="hover:text-blue-400 transition-colors" />
                    </Link>
                    <Link href="https://www.youtube.com/@sportfreunde_nofels" target="_blank" aria-label="YouTube">
                        <FaYoutube className="hover:text-red-400 transition-colors" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}


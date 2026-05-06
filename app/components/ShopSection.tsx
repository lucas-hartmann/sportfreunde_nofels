import React from 'react';
import Image from 'next/image';
import { ShoppingBag, FileText, ArrowRight, Download, ExternalLink } from 'lucide-react';
import Headline from './Headline';

const ARTICLES = [
  { id: 1, name: "Trikot One", price: "16,79€", img: "/shop/shirt.webp" },
  { id: 2, name: "Kapuzensweat", price: "59,99€", img: "/shop/pulli.webp" },
  { id: 3, name: "Fischerhut", price: "23,99€", img: "/shop/hut.webp" },
];

export default function ShopSection() {
  return (
    <section className="py-24 bg-white border-t border-gray-50">
      <div className="container mx-auto px-6 max-w-5xl">
        
        {/* Headline & Dezentrale Flyer-Link */}
        <div className="flex flex-col items-center text-center mb-16">
          <Headline
            pill="Shop & Merch"
            blackLine="Offizielle Team"
            redLine="Kollektion"
            description="Hochwertige Ausrüstung für Spieler und Fans. Jetzt direkt bei unserem Partner JAKO bestellen."
          />
          
          {/* Dezentraler, aber klarer Flyer-Download direkt unter der Beschreibung */}
          <a 
            href="/shop/Flyer_sportfreundenofels.pdf" 
            target="_blank"
            className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 hover:text-primary transition-colors group"
          >
            <FileText size={14} className="group-hover:rotate-12 transition-transform" />
            <span>Gesamten Katalog laden (PDF)</span>
            <Download size={12} className="ml-1 animate-bounce" />
          </a>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {ARTICLES.map((item) => (
            <div key={item.id} className="group relative flex flex-col">
              {/* Image Container */}
              <div className="aspect-[4/5] bg-gray-50 rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden border border-transparent group-hover:border-gray-100 group-hover:bg-white transition-all duration-500">
                <Image 
                  src={item.img} 
                  alt={item.name} 
                  width={200}
                  height={200}
                  className="object-contain p-6 group-hover:scale-110 transition-transform duration-700" 
                />
                
                {/* Integrated Shop-Button (Overlay on Hover) */}
                <a 
                  href="https://team.jako.com/de-de/team/sportfreundenofels/" 
                  target="_blank"
                  className="absolute inset-0 bg-gray-900/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                >
                  <div className="bg-white px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <ShoppingBag size={14} className="text-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">Bestellen</span>
                  </div>
                </a>
              </div>

              {/* Text Info */}
              <div className="flex justify-between items-end px-2">
                <div className="text-left">
                  <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.15em] mb-0.5">
                    {item.name}
                  </h3>
                  <p className="text-base font-black text-gray-900">{item.price}</p>
                </div>
                
                {/* Small Mobile-Friendly Link Icon */}
                <a 
                  href="https://team.jako.com/de-de/team/sportfreundenofels/" 
                  target="_blank"
                  className="sm:hidden p-2 bg-gray-100 rounded-lg text-gray-400"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Footer Info */}
        <div className="mt-20 pt-8 border-t border-gray-50 text-center">
          <p className="text-[9px] font-bold text-gray-300 uppercase tracking-[0.3em]">
            Partner-Ausrüster: Jako AG — Edition 2026
          </p>
        </div>
      </div>
    </section>
  );
}
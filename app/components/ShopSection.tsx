import React from 'react';
import Image from 'next/image';
import { ShoppingBag, FileText, ArrowRight, Download } from 'lucide-react';

const ARTICLES = [
  { id: 1, name: "Trikot One", price: "16,79€", img: "/shop/shirt.webp" },
  { id: 2, name: "Kapuzensweat", price: "59,99€", img: "/shop/pulli.webp" },
  { id: 3, name: "Fischerhut", price: "23,99€", img: "/shop/hut.webp" },
];

export default function ShopSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header - Simple & Athletic */}
        <div className="border-l-4 border-primary pl-6 mb-16">
          <span className="text-primary font-bold uppercase tracking-widest text-xs">
            Ausrüstung & Merch
          </span>
          <h2 className="text-4xl md:text-5xl font-black text uppercase tracking-tight mt-2">
            Team <span className="text-primary italic">Kollektion</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* SHOP CARD: Clean White UI */}
          <div className="lg:col-span-2 bg-gray-50 rounded-3xl p-8 md:p-10 flex flex-col justify-between border border-gray-100 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-500">
            <div>
              <div className="flex justify-between items-start mb-10">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                  <ShoppingBag className="text-primary" size={32} />
                </div>
                <a 
                  href="https://team.jako.com/de-de/team/sportfreundenofels/" 
                  target="_blank"
                  className="group flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-slate-900 transition-colors shadow-lg shadow-primary/20"
                >
                  Zum Online Shop <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <h3 className="text-2xl font-bold text mb-2">Offizieller JAKO Shop</h3>
              <p className="text-gray-600 mb-10 max-w-md">
                Bestelle Trikots, Trainingsanzüge und Zubehör direkt über unseren offiziellen Ausrüster-Partner.
              </p>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {ARTICLES.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 group/item cursor-default">
                    <div className="aspect-square bg-gray-50 rounded-xl mb-3 flex items-center justify-center relative overflow-hidden">
                       <span className="text-[10px] text-gray-300 font-bold uppercase tracking-tighter italic">SF Nofels Gear</span>
                       <Image src={item.img} alt={item.name} fill className="object-contain p-2 group-hover/item:scale-110 transition-transform" />
                    </div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{item.name}</p>
                    <p className="text-sm font-black text">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        {/* CATALOG CARD: Modern Light */}
        <div className="lg:col-span-1 bg-gray-100 rounded-[2rem] p-8 md:p-10 flex flex-col relative overflow-hidden group border border-gray-200">
        {/* Decorative Background Icon - Changed to black/0.03 for light background */}
        <FileText className="absolute -bottom-10 -right-10 text-black/[0.03] rotate-12 group-hover:text-primary/[0.05] transition-colors duration-700" size={280} />
        
        <div className="relative z-10 flex flex-col h-full">
            {/* Icon box now uses a soft red tint */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 w-fit">
                  <FileText className="text-primary" size={32} />
            </div>

            {/* Text changed to dark slate for readability */}
            <h3 className="text-3xl font-black uppercase italic leading-tight mb-4 text">
            Katalog <br /> <span className="text-primary">& Flyer</span>
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-10">
            Lade dir die Übersicht unserer Teamline als PDF herunter.
            </p>

            <div className="mt-auto">
            <a 
                href="/shop/Flyer_sportfreundenofels.pdf" 
                target="_blank"
                className="flex items-center justify-center gap-3 w-full py-4 bg-gray-800 text-white rounded-2xl font-bold hover:bg-primary transition-all duration-300 shadow-lg"
            >
                <Download size={20} /> PDF Öffnen
            </a>
            <p className="text-center text-gray-600 text-[10px] font-bold tracking-[0.2em] mt-6 uppercase">
                Version 2026
            </p>
            </div>
        </div>
        </div>
        </div>
      </div>
    </section>
  );
}
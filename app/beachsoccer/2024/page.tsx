'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const photos = Array.from({ length: 15 }, (_, i) => `/bsc/24/pic${i + 1}.jpg`);

const textBlocks = [
    "Am 13. Juli 2024 erlebte Nofels das Beachsoccer-Highlight des Jahres. Über 300 begeisterte Fans verwandelten den Sandplatz in eine brodelnde Arena voller Emotionen, Teamgeist und Sommerfeeling. Von der ersten Minute an war klar: Das wird ein Tag, den niemand so schnell vergisst.",
    "Das Turnier war geprägt von spannenden Spielen, spektakulären Toren und beeindruckenden Teamleistungen. Ob packende Zweikämpfe im Sand oder jubelnde Fans am Spielfeldrand – die Stimmung war elektrisierend. Der Sand kochte, die Spieler gaben alles und die Zuschauer feierten jeden Treffer wie ein Finale.",
    "„Ein unvergessliches Event – sportlich, familiär und voller Leidenschaft!“ – so lautete das Fazit vieler Besucher:innen. Ob als Spieler:in, Zuschauer:in oder Helfer:in – alle trugen ihren Teil zu diesem einzigartigen Tag bei.",
    "Auch abseits des Spielfelds war einiges geboten: Kolibri versorgte Groß und Klein mit köstlichem Eis, während DJ Mad Mike mit sommerlichen Beats für echtes Festivalfeeling sorgte. Kulinarisch wurden die Gäste mit Gegrilltem vom Meathouse Schöch verwöhnt – dazu gab’s kühle Getränke von Vö üs und Mohrenbräu. Ein Genuss für alle Sinne!",
    "Ein riesiges Dankeschön an alle, die dieses Event möglich gemacht haben: an die freiwilligen Helfer:innen, die Organisator:innen, Sponsoren, Teams und natürlich das fantastische Publikum. Gemeinsam haben wir gezeigt, was in Nofels steckt. Wir freuen uns jetzt schon auf den BeachsoccerCup 2025 – noch größer, noch lauter, noch legendärer!"
];


function useFadeOnScroll() {
    const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);
    const refs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        function onScroll() {
            refs.current.forEach((ref, idx) => {
                if (ref) {
                    const rect = ref.getBoundingClientRect();
                    if (rect.top < window.innerHeight * 0.9) {
                        setVisibleIndexes((prev) =>
                            prev.includes(idx) ? prev : [...prev, idx]
                        );
                    }
                }
            });
        }
        window.addEventListener('scroll', onScroll);
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return { refs, visibleIndexes };
}

export default function BeachsoccerReview() {
    const { refs, visibleIndexes } = useFadeOnScroll();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleClose = () => setSelectedImage(null);

    return (
        <main className="text-gray-800 max-w-7xl mx-auto px-6 py-12 relative">
            <h1 className="text-4xl font-extrabold mb-12 text-primary text-center">
                BeachsoccerCup 2024 – Rückblick
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {/* Interleaved text blocks */}
                {textBlocks.map((text, i) => (
                    <section
                        key={`text-${i}`}
                        className="max-w-3xl col-span-full mx-auto px-6 py-4 text-center" // <— hier py-4 statt py-12
                        style={{ order: (i + 1) * 6 + 0.5 }}
                    >
                        {i === 2 ? (
                            <blockquote className="border-l-8 border-primary pl-6 italic text-primary font-semibold text-xl">
                                {text}
                            </blockquote>
                        ) : (
                            <p className="text-lg leading-relaxed">{text}</p>
                        )}
                    </section>
                ))}

                {photos.map((src, idx) => (
                    <div
                        key={`photo-${idx}`}
                        ref={(el) => (refs.current[idx] = el)}
                        className={`overflow-hidden rounded-lg shadow-lg transform transition duration-700 ease-in-out cursor-pointer ${
                            visibleIndexes.includes(idx)
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-10'
                        } hover:scale-105`}
                        style={{ aspectRatio: '4 / 3', position: 'relative' }}
                        onClick={() => setSelectedImage(src)}
                    >
                        <Image
                            src={src}
                            alt={`Beachsoccer Bild ${idx + 1}`}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority={idx < 3}
                        />
                    </div>
                ))}
            </div>

            {/* Fullscreen Image Overlay */}
            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 cursor-pointer"
                    onClick={handleClose}
                >
                    <div className="relative w-full max-w-5xl aspect-[4/3] mx-4 sm:mx-12">
                        <Image
                            src={selectedImage}
                            alt="Full Size"
                            fill
                            className="object-contain"
                        />
                    </div>
                </div>
            )}
        </main>
    );
}

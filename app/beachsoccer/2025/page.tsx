"use client";

import React from "react";

const BeachsoccerCup = () => {
    return (
        <div className="min-h-screen bg-white text-gray-900 font-sans">
            {/* Hero Section */}
            <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden">
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    poster="/bsc/background.JPG"
                >
                    <source src="/bsc/background.MP4" type="video/mp4" />
                    Dein Browser unterstützt das Video-Tag nicht.
                </video>

                <div className="absolute inset-0 bg-black opacity-60"></div>

                <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg max-w-4xl leading-tight">
                    Beachsoccer Cup 2025
                </h1>
                <p className="relative z-10 mt-4 max-w-2xl text-lg md:text-xl text-white font-semibold drop-shadow">
                    Sonne, Sand und spannende Matches – das größte Beachsoccer-Turnier in Vorarlberg wartet auf dich!
                </p>
                <a
                    href="#anmeldung"
                    className="relative z-10 mt-10 inline-block border-2 border-white text-white font-semibold text-xl py-3 px-8 rounded-xl hover:bg-white hover:text-[#781c12] transition"
                >
                    Jetzt Team anmelden
                </a>
            </section>

            {/* Info + Video Section */}
            <section className="max-w-6xl mx-auto py-16 px-6 md:px-0 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-4xl font-extrabold text-[#781c12] mb-6 border-b-4 border-[#a62c1a] inline-block pb-1">
                        Veranstaltungsdetails
                    </h2>
                    <p className="text-lg mb-4">
                        <strong>Datum:</strong> 12. Juli 2025<br />
                        <strong>Ort:</strong> Volksschule Nofels, Schmittengässele 28 – 6800 Feldkirch
                    </p>
                    <p className="mb-6 leading-relaxed">
                        Ein Tag voller Action, Sport und Spaß für alle Beachsoccer-Fans. Genieße spannende Matches, coole Musik, leckeres Essen und eine fantastische Atmosphäre direkt am Sand.
                    </p>

                    <a
                        href="/bsc/A4_Turnierausschreibung_2025.pdf"
                        download
                        className="inline-block bg-[#781c12] text-white px-6 py-3 rounded-md shadow hover:bg-[#a62c1a] transition"
                    >
                        Turnierregeln herunterladen
                    </a>
                </div>

                <div className="w-full rounded-lg overflow-hidden shadow-lg">
                    <div className="relative pt-[56.25%]">
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube-nocookie.com/embed/2Lh-3GtXjKo"
                            title="Beachsoccer Cup 2022 Rückblick"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="bg-[#f9fafb] py-16 px-6">
                <h2 className="text-4xl font-extrabold text-[#781c12] max-w-6xl ml-[25%] md:ml-[25%] mb-12 border-b-4 border-[#a62c1a] inline-block pb-1 text-left md:text-left text-center">
                Galerie
                </h2>
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="rounded-lg overflow-hidden shadow-md">
                            <img
                                src={`/bsc/images/pic${i + 1}.jpg`}
                                alt={`Beachsoccer Bild ${i + 1}`}
                                className="w-full h-48 object-cover"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* Highlights Section */}
            <section className="bg-white py-16 px-6">
                <h2 className="text-4xl font-extrabold text-[#781c12] max-w-6xl ml-[25%] md:ml-[25%] mb-12 border-b-4 border-[#a62c1a] inline-block pb-1 text-left md:text-left text-center">
                Highlights
                </h2>
                <div className="max-w-4xl mx-auto space-y-6 text-lg text-gray-800">
                    <p>⚽ <strong>Fußballturnier im Sand:</strong> Zeige Geschick und Teamgeist – spiele um den Sieg!</p>
                    <p>🎈 <strong>Hüpfburg:</strong> Ein Paradies zum Austoben für Kinder.</p>
                    <p>🎨 <strong>Kinderschminken:</strong> Werde zum Tiger, Fee oder Superheld!</p>
                    <p>🍔 <strong>Leckeres vom Grill:</strong> Genieße Spezialitäten vom <a className="text-[#781c12] underline" href="https://meathouse.at/" target="_blank" rel="noopener noreferrer">Meathouse Schöch</a>.</p>
                    <p>🏊 <strong>Pools zum Abkühlen:</strong> Erfrischung zwischen den Spielen.</p>
                    <p>🌴 <strong>Strandliegen:</strong> Entspannen wie am brasilianischen Strand!</p>
                    <p className="mt-6 font-semibold text-[#781c12] text-xl">Tolle Preise warten auf dich! Gewinne Strandzubehör, Staubsauger, Restaurant-Gutscheine u. v. m.!</p>
                </div>
            </section>

            {/* Sign-Up Form */}
            <section
                id="anmeldung"
                className="max-w-4xl mx-auto py-20 px-6 bg-white rounded-xl shadow-lg text-gray-900"
            >
                <h2 className="text-4xl font-extrabold mb-10 text-[#781c12] text-center">
                    Team-Anmeldung
                </h2>

                <form
                    className="space-y-8"
                    onSubmit={(e) => {
                        e.preventDefault();
                        alert("Danke für deine Anmeldung! Wir melden uns bald bei dir.");
                    }}
                >
                    {[
                        { id: "name", label: "Name", type: "text", placeholder: "Max Mustermann" },
                        { id: "email", label: "E-Mail", type: "email", placeholder: "deine@email.com" },
                        { id: "phone", label: "Telefonnummer", type: "tel", placeholder: "+43 660 1234567" },
                        { id: "teamName", label: "Teamname", type: "text", placeholder: "Name deines Teams" },
                    ].map(({ id, label, type, placeholder }) => (
                        <div key={id}>
                            <label htmlFor={id} className="block mb-2 font-semibold text-gray-800">{label}</label>
                            <input
                                name={id}
                                id={id}
                                type={type}
                                placeholder={placeholder}
                                required
                                className="w-full rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#781c12]"
                            />
                        </div>
                    ))}

                    <div>
                        <label htmlFor="message" className="block mb-2 font-semibold text-gray-800">
                            Nachricht
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            placeholder="Was du uns noch sagen möchtest..."
                            className="w-full rounded-md border border-gray-300 px-4 py-3 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-[#781c12]"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[#781c12] text-white font-extrabold py-4 rounded-xl text-xl hover:bg-[#a62c1a] transition"
                    >
                        Jetzt anmelden
                    </button>
                </form>
            </section>
        </div>
    );
};

export default BeachsoccerCup;

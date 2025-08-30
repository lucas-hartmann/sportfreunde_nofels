import { Volleyball, Castle, Brush, Hamburger, Waves, Sun, Gift } from "lucide-react";

export default function SignUpForm() {
    return(
        <main>{/* Highlights Section */}
            <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Card 1 */}
                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
                <Volleyball className="w-8 h-8 text-[#781c12] flex-shrink-0" />
                <div>
                    <h3 className="font-semibold text-lg">Fußballturnier im Sand</h3>
                    <p className="text-gray-700">Zeige Geschick und Teamgeist – spiele um den Sieg!</p>
                </div>
                </div>

                {/* Card 2 */}
                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
                <Castle className="w-8 h-8 text-[#781c12] flex-shrink-0" />
                <div>
                    <h3 className="font-semibold text-lg">Hüpfburg</h3>
                    <p className="text-gray-700">Ein Paradies zum Austoben für Kinder.</p>
                </div>
                </div>

                {/* Card 3 */}
                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
                <Brush className="w-8 h-8 text-[#781c12] flex-shrink-0" />
                <div>
                    <h3 className="font-semibold text-lg">Kinderschminken</h3>
                    <p className="text-gray-700">Werde zum Tiger, Fee oder Superheld!</p>
                </div>
                </div>

                {/* Card 4 */}
                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
                <Hamburger className="w-8 h-8 text-[#781c12] flex-shrink-0" />
                <div>
                    <h3 className="font-semibold text-lg">Leckeres vom Grill</h3>
                    <p className="text-gray-700">
                    Genieße Spezialitäten vom{" "}
                    <a
                        href="https://meathouse.at/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#781c12] underline"
                    >
                        Meathouse Schöch
                    </a>.
                    </p>
                </div>
                </div>

                {/* Card 5 */}
                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
                <Waves className="w-8 h-8 text-[#781c12] flex-shrink-0" />
                <div>
                    <h3 className="font-semibold text-lg">Pools zum Abkühlen</h3>
                    <p className="text-gray-700">Erfrischung zwischen den Spielen.</p>
                </div>
                </div>

                {/* Card 6 */}
                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-xl shadow hover:shadow-lg transition cursor-pointer">
                <Sun className="w-8 h-8 text-[#781c12] flex-shrink-0" />
                <div>
                    <h3 className="font-semibold text-lg">Strandliegen</h3>
                    <p className="text-gray-700">Entspannen wie am brasilianischen Strand!</p>
                </div>
                </div>

                {/* Card 7 */}
                <div className="col-span-full flex items-start gap-4 p-6 bg-[#781c12] rounded-xl shadow text-white hover:shadow-lg transition cursor-pointer">
                <Gift className="w-8 h-8 flex-shrink-0" />
                <div>
                    <h3 className="font-semibold text-lg">Tolle Preise warten auf dich!</h3>
                    <p>Gewinne Strandzubehör, Staubsauger, Restaurant-Gutscheine u. v. m.!</p>
                </div>
                </div>
            </div>
    </main>
    );
}
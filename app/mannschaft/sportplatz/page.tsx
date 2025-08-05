// pages/Ort.tsx
import React from "react";
import { MapPin } from "lucide-react";

const Ort: React.FC = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
            {/* Header */}
            <div className="bg-white border-b shadow-md">
                <div className="container mx-auto px-4 py-6 flex items-center gap-4">
                    <h1 className="text-3xl font-extrabold text-gray-800">UNSER STANDORT</h1>
                </div>
            </div>

            {/* Trainingsplatz */}
            <section className="bg-white rounded-2xl shadow p-6 space-y-4">
                <h2 className="text-2xl font-semibold">Trainingsplatz - Äuele Nofels</h2>
                <p className="text-gray-700">
                    Das Äuele – unser Herzensplatz – wird in ganz Nofels von Jung und Alt geschätzt. Ob ein lockerer Kick nach der Schule oder Champions-League-Feeling am Donnerstagabend mit der Kampfmannschaft – hier ist immer was los.

                    Platz gibt’s für alle, egal ob Hobby-Kicker, Nachwuchstalent oder Alt-Herren-Legende.

                    Der Sportplatz ist ganzjährig geöffnet – auch wenn’s vielleicht manchmal manchmal besser wär, dem Acker eine Pause zu gönnen. Aber hey, sei's drum.

                    Direkt daneben steht unser voll ausgestattetes Clubheim – dort wird oft mehr Zeit verbracht als auf dem Feld selbst.

                    Klar, das Spielfeld ist ein bisschen zu kurz, Bälle verschwinden gerne im Wald und abends durch das fehlende Flutlicht eher mystisch dunkel – für offizielle Spiele leider nicht geeignet.

                    Aber für uns ist es perfekt. Äuele halt.</p>
                <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 shadow-inner">
                    <iframe
                        title="Trainingsplatz"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2730.2883487428366!2d9.5728977!3d47.2597052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479b3bcbfa7de9a3%3A0x9bb3df759c6b765b!2sSportplatz%20%C3%84uele%20Nofels!5e0!3m2!1sde!2sat!4v1716309931440!5m2!1sde!2sat"
                        className="w-full h-full border-0"
                        loading="lazy"
                    />
                </div>
            </section>

            {/* Heimspielplatz */}
            <section className="bg-white rounded-2xl shadow p-6 space-y-4">
                <h2 className="text-2xl font-semibold">Heimspielplatz - Gisingen 2er Platz</h2>
                <p className="text-gray-700">
                    Wenn’s ernst wird, wird hier gespielt: Auf unserem Heimspielplatz finden die offiziellen Ligaspiele statt – unter perfekten Bedingungen.

                    Der Platz ist top gepflegt, die Linien sind gerade, und das Flutlicht sorgt auch am Abend für klare Sicht.

                    In unserem kleinen Ausschank Hüsle gibt es auch stets Speis und Trank für die treuen Fans, die an der Auslinie bei den Heimspielen mitfiebern.
                </p>
                <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 shadow-inner">
                    <iframe
                        title="Heimspielplatz"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2730.230018469582!2d9.580279!3d47.260154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479b3bce8a1d02c1%3A0x42c7f8f0d7b6a0ea!2zNDfCsDE1JzM2LjYiTiA5wrAzNCc1Ni45IkU!5e0!3m2!1sde!2sat!4v1716312530000!5m2!1sde!2sat
"
                        className="w-full h-full border-0"
                        loading="lazy"
                    />
                </div>
            </section>

            {/* Adresse */}
            <footer className="text-center space-y-2">
                <div className="flex justify-center items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>Sägerstraße 70, 6800 Feldkirch, Österreich</span>
                </div>
                <p className="text-sm text-gray-500">Parkplätze und Umkleiden sind vorhanden.</p>
            </footer>
        </div>
    );
};

export default Ort;

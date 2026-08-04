"use client"; 
import Header from "../../components/Header";
import ImageGallery from "@/app/components/ImageGallery";

export default function Beachsoccer2026() {
    return (
        <span>
            {/* Header */}
            <Header
                title="Beachsoccer Cup 2026"
                image="/headers/bsc26.webp"
            />
            <main className="min-h-screen bg-neutral-50 py-12 px-6">
                <ImageGallery folder="beachsoccer2026" />
            </main>
        </span>
    );
}

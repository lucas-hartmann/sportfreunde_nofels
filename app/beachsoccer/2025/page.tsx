"use client"; // ✅ Make this a client componentimport React from "react";
import Header from "../../components/Header";
import { listImages } from "@/lib/images";
import ImageGallery from "@/app/components/ImageGallery";

export default function Beachsoccer2025() {
    return (
        <span>
            {/* Header */}
            <Header
                title="Beachsoccer 2025"
                image="/bsc/background.JPG"
            />
            <main className="min-h-screen bg-neutral-50 py-12 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-lg font-medium">Description</h2>
                </div>
                <ImageGallery folder="beachsoccer2025" />
            </main>
        </span>
    );
}

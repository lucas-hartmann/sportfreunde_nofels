import Header from "@/app/components/Header";
import ImageGallery from "@/app/components/ImageGallery";

export default function Gallery2024(){
    return(
        <span>
        {/* Header */}
        <Header
            title="Beachsoccer Cup 2024"
            image="/headers/bsc24.webp"
            position="top"
        />
        <main className="min-h-screen bg-neutral-50 py-12 px-6">
            <ImageGallery folder="beachsoccer2024" />
        </main>
        </span>
    );
}
import Header from "@/app/components/Header";
import ImageGallery from "@/app/components/ImageGallery";

export default function Gallery2023(){
    return(
        <span>
        {/* Header */}
        <Header
            title="Beachsoccer Cup 2023"
            image="/headers/bsc23.webp"
        />
        <main className="min-h-screen bg-neutral-50 py-12 px-6">
            <ImageGallery folder="beachsoccer2023" />
        </main>
        </span>
    );
}
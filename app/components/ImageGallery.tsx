"use client";
import { AwsImage, listImages } from "@/lib/images";
import { url } from "inspector";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import Masonry from "react-masonry-css";

export default function ImageGallery({ folder }: { folder: string }) {
    const [images, setImages] = useState<AwsImage[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    useEffect(() => {
        listImages(folder).then(setImages);
    }, [folder]);

    const handleCloseModal = () => {
        setSelectedIndex(null);
    };

    const breakpointColumnsObj = {
        default: 3,
        1280: 3,
        640: 2,
        0: 1,
    };

    return (
        <div>
            {selectedIndex !== null && (
                <Modal
                    images={images}
                    index={selectedIndex}
                    onClose={handleCloseModal}
                />
            )}{" "}
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex gap-4"
                columnClassName="flex flex-col gap-4"
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedIndex(index)}
                        className="after:content group relative block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
                    >
                        <Image
                            alt="Next.js Conf photo"
                            className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
                            style={{ transform: "translate3d(0, 0, 0)" }}
                            src={image.thumbUrl}
                            width={720}
                            height={480}
                            sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
                            onError={(e) => {
                                console.error(image.key);
                            }}
                        />
                    </div>
                ))}
            </Masonry>
        </div>
    );
}

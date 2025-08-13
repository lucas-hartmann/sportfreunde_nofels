"use client"; // ✅ Make this a client component
import { AwsImage, listImages } from "@/lib/images";
import { url } from "inspector";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ImageGallery({ folder }: { folder: string }) {
    const [images, setImages] = useState<AwsImage[]>([]);

    useEffect(() => {
        listImages(folder).then(setImages);
    }, [folder]);
    const breakpointColumnsObj = {
        default: 4,
        1536: 4,
        1280: 3,
        640: 2,
        0: 1,
    };

    return (
        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
            {images.map((image: AwsImage, index: number) => (
                <Link
                    key={index}
                    //href={`/?photoId=${id}`}
                    href={"/#"}
                    //as={`/p/${id}`}
                    //ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
                    shallow
                    className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
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
                    />
                </Link>
            ))}
        </div>
    );
}

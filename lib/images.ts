"use server";

import galleries from "@/data/galleries.json";

export interface AwsImage {
	thumbUrl: string;
	mediumUrl: string;
	url: string;
	key: string;
	id: number;
}

export async function listImages(folder: string): Promise<AwsImage[]> {
	const allImages = galleries[folder];

	// Filter images by folder if needed
	const filteredImages = allImages.filter((image) =>
		image.url.includes(`/${folder}/`),
	);

	return filteredImages;
}

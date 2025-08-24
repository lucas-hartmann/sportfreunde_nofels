"use server";

import fs from "fs";
import path from "path";

export interface AwsImage {
	thumbUrl: string;
	mediumUrl: string;
	url: string;
	key: string;
	id: number;
}

export async function listImages(folder: string): Promise<AwsImage[]> {
	const filePath = path.resolve(process.cwd(), "public", "galleries.json");

	if (!fs.existsSync(filePath)) {
		console.warn(`JSON file not found: ${filePath}`);
		return [];
	}

	const fileContent = fs.readFileSync(filePath, "utf-8");
	const allGalleries = JSON.parse(fileContent);
	const allImages = allGalleries[folder];
	// Filter images by folder if needed
	const filteredImages = allImages.filter((image) =>
		image.url.includes(`/${folder}/`),
	);

	return filteredImages;
}

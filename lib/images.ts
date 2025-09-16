"use server";

import galleries from "@/public/galleries.json";

export interface AwsImage {
	thumbUrl: string;
	mediumUrl: string;
	url: string;
	key: string;
	id: number;
}

export async function listImages(gallery: string): Promise<AwsImage[]> {
	return galleries[gallery];
}

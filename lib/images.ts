"use server";
import { S3, ListObjectsV2Command } from "@aws-sdk/client-s3";

export interface AwsImage {
	thumbUrl: string;
	mediumUrl: string;
	url: string;
	key: string;
	id: number;
}

const s3 = new S3({
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
	},
	region: process.env.AWS_REGION,
});

export async function listImages(folder: string): Promise<AwsImage[]> {
	const command = new ListObjectsV2Command({
		Bucket: process.env.AWS_BUCKET_NAME!,
		Prefix: `${folder}/`,
	});

	const response = await s3.send(command);

	const imageUrls: AwsImage[] = response.Contents?.filter(
		(item) =>
			item.Key &&
			!item.Key.endsWith("/") &&
			!item.Key.includes("/thumbs/") &&
			!item.Key.includes("/medium"),
	).map((item, index) => {
		const fullKey = item.Key!;
		const filename = fullKey.split("/").pop(); // get filename
		const thumbKey = `${folder}/thumbs/${filename?.replace(/\.[^/.]+$/, ".avif")}`;
		const mediumKey = `${folder}/medium/${filename?.replace(/\.[^/.]+$/, ".avif")}`;
		return {
			url: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fullKey}`,
			thumbUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${thumbKey}`,
			mediumUrl: `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${mediumKey}`,
			key: filename,
			id: index,
		};
	});

	return imageUrls ?? [];
}

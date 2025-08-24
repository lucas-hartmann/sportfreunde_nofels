import { S3, ListObjectsV2Command } from "@aws-sdk/client-s3";
import "dotenv/config"; // automatically loads .env
import path from "path";
import fs from "fs";

const s3 = new S3({
	credentials: {
		accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID!,
		secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY!,
	},
	region: process.env.MY_AWS_REGION,
});

interface AwsImage {
	thumbUrl: string;
	mediumUrl: string;
	url: string;
	key: string;
	id: number;
}

/**
 * List images in a folder
 */

async function listImages(folder: string): Promise<AwsImage[]> {
	const command = new ListObjectsV2Command({
		Bucket: process.env.MY_AWS_BUCKET_NAME!,
		Prefix: `${folder}/`,
	});

	const response = await s3.send(command);

	return (
		response.Contents?.filter(
			(item) =>
				item.Key &&
				!item.Key.endsWith("/") &&
				!item.Key.includes("/thumbs/") &&
				!item.Key.includes("/medium"),
		).map((item, index) => {
			const fullKey = item.Key!;
			const filename = fullKey.split("/").pop();
			const thumbKey = `${folder}/thumbs/${filename?.replace(/\.[^/.]+$/, ".avif")}`;
			const mediumKey = `${folder}/medium/${filename?.replace(/\.[^/.]+$/, ".avif")}`;
			return {
				url: `https://${process.env.MY_AWS_CLOUDFRONT_DOMAIN}/${fullKey}`,
				thumbUrl: `https://${process.env.MY_AWS_CLOUDFRONT_DOMAIN}/${thumbKey}`,
				mediumUrl: `https://${process.env.MY_AWS_CLOUDFRONT_DOMAIN}/${mediumKey}`,
				key: filename!,
				id: index,
			};
		}) ?? []
	);
}

/**
 * Get all folders in the bucket (top-level)
 */

async function listFolders(): Promise<string[]> {
	const command = new ListObjectsV2Command({
		Bucket: process.env.MY_AWS_BUCKET_NAME!,
		Delimiter: "/", // returns "folders" in CommonPrefixes
	});

	const response = await s3.send(command);
	return (
		response.CommonPrefixes?.map((p) => p.Prefix?.replace(/\/$/, "")!) ?? []
	);
}

/**
 * Main build-time script
 */
async function main() {
	const folders = await listFolders();
	console.log(folders);
	const result: Record<string, AwsImage[]> = {};

	for (const folder of folders) {
		console.log(`Processing gallery: ${folder}`);
		result[folder] = await listImages(folder);
	}

	const outputPath = path.join(process.cwd(), "public", "galleries.json");
	fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
	console.log(`Gallery JSON created at ${outputPath}`);

	console.log("hallo");
}

main().catch(console.error);

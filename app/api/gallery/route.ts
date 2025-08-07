import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function GET() {
  try {
    const result = await cloudinary.search
      .expression("folder:BSC25") // your folder name here
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute();

    const images = result.resources.map((img: any) => ({
      url: img.secure_url.replace(
        "/upload/",
        "/upload/w_600,h_400,c_fill,g_center,q_auto,f_auto/"
      ),
      full: img.secure_url,
      alt: img.public_id,
    }));



    return NextResponse.json(images);
  } catch (error) {
    console.error("Cloudinary API error:", error);
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 });
  }
}

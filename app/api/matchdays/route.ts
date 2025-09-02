import fs from "fs";
import path from "path";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; // adjust path if needed

export async function GET() {
  const filePath = path.join(process.cwd(), "data", "spielplan2025.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const data = JSON.parse(fileContents);

  return Response.json(data);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const updates = await req.json(); // full matchdaysData array
  const filePath = path.join(process.cwd(), "data", "spielplan2025.json");

  fs.writeFileSync(filePath, JSON.stringify(updates, null, 2), "utf8");

  return Response.json({ success: true });
}

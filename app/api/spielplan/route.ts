import { NextResponse } from "next/server";
import { matchdays } from "@/data/spielplan2025";

export async function GET() {
  return NextResponse.json(matchdays);
}

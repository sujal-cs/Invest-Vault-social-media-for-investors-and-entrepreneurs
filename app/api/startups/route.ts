import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@lib/mongodb";
import Startup from "@models/Startup";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const startups = await Startup.find({}).lean();
    return NextResponse.json({ startups });
  } catch (error) {
    console.error("Error fetching startups:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

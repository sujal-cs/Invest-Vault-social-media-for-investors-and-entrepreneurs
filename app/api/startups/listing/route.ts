import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@lib/mongodb";
import StartupListing from "@models/StartupListing";

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  const listing = await StartupListing.findOne({ userId }).lean();
  if (!listing) {
    return NextResponse.json({ message: "No listing found" }, { status: 404 });
  }
  return NextResponse.json({ listing });
}

export async function PUT(req: NextRequest) {
  await connectToDatabase();
  const { userId, fundingRequired, equityOffered } = await req.json();
  if (!userId || fundingRequired === undefined || equityOffered === undefined) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  let listing = await StartupListing.findOne({ userId });
  if (listing) {
    listing.fundingRequired = fundingRequired;
    listing.equityOffered = equityOffered;
    listing.updatedAt = new Date();
    await listing.save();
  } else {
    listing = new StartupListing({
      userId,
      fundingRequired,
      equityOffered,
      updatedAt: new Date(),
    });
    await listing.save();
  }
  return NextResponse.json({ message: "Listing updated", listing });
}

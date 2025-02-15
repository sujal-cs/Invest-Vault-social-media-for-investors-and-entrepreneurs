import { NextResponse } from "next/server";
import { serialize } from "cookie";

export async function POST() {
  const serializedCookie = serialize("authToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0, // Expire immediately
  });

  return new NextResponse(JSON.stringify({ message: "Logged out successfully!" }), {
    status: 200,
    headers: { "Set-Cookie": serializedCookie },
  });
}

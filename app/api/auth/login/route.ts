import { connectToDatabase } from "@lib/mongodb";
import User from "@models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Use an env variable in production

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required!" }, { status: 400 });
    }

    const db = await connectToDatabase();
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password!" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid email or password!" }, { status: 401 });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

    // Set JWT as HTTP-Only Cookie
    const serializedCookie = serialize("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true in production (HTTPS)
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 Days
    });

    return new NextResponse(JSON.stringify({ message: "Login successful!" }), {
      status: 200,
      headers: { "Set-Cookie": serializedCookie },
    });
  } catch (error) {
    console.error("Error in Login API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

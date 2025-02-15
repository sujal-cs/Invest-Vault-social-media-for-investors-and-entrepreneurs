import { connectToDatabase } from "@lib/mongodb";
import User from "@models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "All fields are required!" }, { status: 400 });
    }

    const db = await connectToDatabase();
    const existingUser = await db.collection("users").findOne({ email });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists!" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "User registered successfully!", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Error in Register API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

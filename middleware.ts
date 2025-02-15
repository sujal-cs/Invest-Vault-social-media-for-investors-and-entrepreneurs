import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Use env variable in production

export function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if no token
  }

  try {
    jwt.verify(token, JWT_SECRET); // Verify JWT
    return NextResponse.next();
  } catch (error) {
    console.error("Invalid Token:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Apply middleware to protected routes
export const config = {
  matcher: ["/dashboard", "/profile"], // Add protected routes here
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const method = req.method;

  // Allow all requests to /post/:identifier
  const postIdentifierPattern = /^\/post\/[^/]+$/;
  if (postIdentifierPattern.test(pathname)) {
    return NextResponse.next();
  }

  // Secure POST, DELETE, and GET requests elsewhere
  if (method === "GET" || method === "POST" || method === "DELETE") {
    const authHeader = req.cookies.get("token")?.value || req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login
    }

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

    try {
      jwt.verify(token, process.env.JWT_SECRETE_STRING as string);      
      return NextResponse.next(); 
    } catch (error) {
      console.error("JWT Verification Failed:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

// 🔹 Apply middleware only to these routes
export const config = {
  matcher: ["/post/:path*"],
};

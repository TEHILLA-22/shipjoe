import { NextRequest, NextResponse } from "next/server";
import {
  createAdminToken,
  SESSION_COOKIE_NAME,
  SESSION_DURATION_SECONDS,
} from "@/lib/auth/admin-jwt";
import { verifyAdminCredentials } from "@/lib/auth/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        { status: 400 },
      );
    }

    const validCredentials =
      await verifyAdminCredentials(email, password);

    if (!validCredentials) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid email or password.",
        },
        { status: 401 },
      );
    }

    const token = await createAdminToken(email);

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful.",
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_DURATION_SECONDS,
    });

    return response;
  } catch (error) {
    console.error("POST /api/admin/login failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to authenticate.",
      },
      { status: 500 },
    );
  }
}
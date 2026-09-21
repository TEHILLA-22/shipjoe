import argon2 from "argon2";
import { cookies } from "next/headers";
import { Admins } from "@/lib/db/orm";
import {
  SESSION_COOKIE_NAME,
  verifyAdminToken,
  type AdminTokenPayload,
} from "./admin-jwt";

export async function verifyAdminCredentials(
  email: string,
  password: string,
) {
  const normalizedEmail = email.trim().toLowerCase();

  try {
    const adminRows = await Admins.query()
      .where("email", "=", normalizedEmail)
      .get();

    const admin = adminRows[0];

    if (!admin || !admin.passwordHash) {
      return false;
    }

    return await argon2.verify(admin.passwordHash, password);
  } catch {
    return false;
  }
}

export async function getAdminSession(): Promise<AdminTokenPayload | null> {
  const cookieStore = await cookies();

  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  return verifyAdminToken(token);
}

export async function requireAdmin(): Promise<AdminTokenPayload> {
  const session = await getAdminSession();

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  return session;
}
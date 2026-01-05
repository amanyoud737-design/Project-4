import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_token";

export function signAdminToken() {
  const secret = process.env.JWT_SECRET || "dev-secret";
  return jwt.sign({ role: "admin" }, secret, { expiresIn: "7d" });
}

export function isAdminRequest(): boolean {
  const secret = process.env.JWT_SECRET || "dev-secret";
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    jwt.verify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export const adminCookie = {
  name: COOKIE_NAME,
  options: {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  }
};

import { NextResponse } from "next/server";
import { adminCookie, signAdminToken } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const form = await req.formData();
  const user = String(form.get("user") || "");
  const pass = String(form.get("pass") || "");

  const ok = user === (process.env.ADMIN_USER || "admin")
    && pass === (process.env.ADMIN_PASSWORD || "admin123!ChangeMe");

  if (!ok) {
    return NextResponse.redirect(new URL("/admin?err=1", req.url));
  }

  const token = signAdminToken();
  const res = NextResponse.redirect(new URL("/admin", req.url));
  res.cookies.set(adminCookie.name, token, adminCookie.options);
  return res;
}

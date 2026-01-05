import fs from "node:fs";
import path from "node:path";

export const DATA_DIR = process.env.RENDER === "true" ? "/var/data" : path.join(process.cwd(), "var");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

export function ensureDirs() {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

export function safeJoinUpload(relPath: string) {
  const p = path.normalize(relPath).replace(/^(\.\.(\/|\\|$))+/, "");
  return path.join(UPLOAD_DIR, p);
}

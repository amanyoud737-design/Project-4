import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "مُصمِّم العروض",
  description: "حوّل محتواك إلى عرض PowerPoint احترافي خلال ثوانٍ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  );
}

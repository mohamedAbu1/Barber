import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "باربر 3D | اختيار ذكي لإطلالتك",
  description: "جرّب قصات الشعر وأنماط الذقن على نموذجك ثلاثي الأبعاد قبل زيارة الحلاق.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}

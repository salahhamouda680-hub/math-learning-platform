import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "خطوة | منصة تعليمية", template: "%s | خطوة" },
  description: "منصة عربية للتدرب على أساسيات الرياضيات.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <header className="border-b border-ink/10 bg-white">
          <div className="shell flex min-h-18 items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 text-xl font-black">
              <span aria-hidden="true" className="grid size-9 place-items-center rounded-xl bg-accent text-white">+</span>
              خطوة
            </Link>
            <nav aria-label="التنقل الرئيسي" className="flex gap-5 text-sm font-bold sm:gap-8">
              <Link href="/" className="hover:text-accent">الرئيسية</Link>
              <Link href="/subjects" className="hover:text-accent">المواد الدراسية</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="border-t border-ink/10 bg-white">
          <div className="shell flex flex-wrap justify-between gap-2 py-6 text-sm text-muted">
            <span className="font-bold text-ink">خطوة</span>
            <span>منصة تعليمية عربية</span>
          </div>
        </footer>
      </body>
    </html>
  );
}

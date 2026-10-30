"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Wallet" },
  { href: "/buy/", label: "Buy" },
  { href: "/sell/", label: "Sell" },
  { href: "/history/", label: "History" },
  { href: "/academy/", label: "Academy" },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname() || "/";
  const norm = (p: string) => (p.endsWith("/") ? p : p + "/");
  return (
    <div className="min-h-screen bg-ink text-cream flex flex-col">
      <div className="sticky top-0 z-50 w-full bg-gold text-ink text-center text-xs sm:text-sm font-medium px-3 py-2 tracking-wide">
        Demo only, not available yet, no real funds, not financial advice.
      </div>
      <header className="border-b border-gold/20 bg-ink/95">
        <div className="mx-auto max-w-lg px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-semibold text-gold tracking-tight text-lg">
            ObaCore <span className="text-cream/70 font-normal text-sm">Capital Lite</span>
          </Link>
          <span className="sim-badge">Sample User</span>
        </div>
        <nav className="mx-auto max-w-lg px-2 pb-2 flex gap-1 overflow-x-auto">
          {links.map((l) => {
            const p = norm(path);
            const active = l.href === "/" ? p === "/" : p.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href} className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm ${active ? "bg-gold text-ink font-medium" : "text-cream/70 hover:text-gold hover:bg-gold/10"}`}>
                {l.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="flex-1 mx-auto w-full max-w-lg px-4 py-6">{children}</main>
      <footer className="border-t border-gold/10 py-4 text-center text-[11px] text-cream/40 px-4">
        ObaCore Capital Lite · A Global Allure LLC project.
        <br />Sample data only. Nothing you do here is saved.
      </footer>
    </div>
  );
}

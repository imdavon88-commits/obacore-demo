import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DemoProvider } from "@/lib/demo";
import AppShell from "@/components/Shell";

export const metadata: Metadata = {
  title: "ObaCore Capital Lite (demo)",
  description: "A Global Allure LLC project, in development, no real funds.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#0a0a0a" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <DemoProvider><AppShell>{children}</AppShell></DemoProvider>
      </body>
    </html>
  );
}

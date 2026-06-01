import type { Metadata } from "next";
import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PwaRegister } from "@/components/shared/PwaRegister";
import { MobileShell } from "@/components/shared/MobileShell";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "TICMI — Adaptive Classroom AI",
  description: "Multi-agent adaptive classroom platform.",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "TICMI" },
  icons: { icon: "/icon-192.svg", apple: "/icon-192.svg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${geist.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="theme-color" content="#5B5BF7" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <PwaRegister />
        <MobileShell>
          {children}
        </MobileShell>
      </body>
    </html>
  );
}

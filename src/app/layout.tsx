import type { Metadata } from "next";
import { Syne, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "NASIR BHUTTA — Software Architect & Academic Fellow",
  description:
    "Cinematic engineering portfolio & academic dossier for talent acquisition, client ventures, and scholarly admissions.",
  keywords: ["Nasir Bhutta", "Software Architect", "Full-Stack", "Flutter", "AI Systems", "Academic Research"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${jetbrainsMono.variable} ${inter.variable} dark bg-[#050505]`}
    >
      <body className="min-h-full bg-[#050505] text-[#e8e8ed] font-sans selection:bg-[#d4af37] selection:text-black overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}

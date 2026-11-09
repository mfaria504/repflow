import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://repflow.com"),
  title: "RepFlow. The builder behind the scenes for rep agencies.",
  description:
    "RepFlow builds the tools your sales and operations teams wish they had, connects them to the systems you already run, and keeps them working. Builders, not software, for manufacturers' rep agencies.",
  openGraph: {
    title: "RepFlow. The builder behind the scenes for rep agencies.",
    description:
      "Say what you wish you had. We build it, teach it, and keep it running.",
    url: "https://repflow.com",
    siteName: "RepFlow",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${plexSans.variable} ${plexMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}

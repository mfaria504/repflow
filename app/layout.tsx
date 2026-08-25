import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://repflow.com"),
  title: "RepFlow. Fractional RevOps for rep agencies.",
  description:
    "Your back office, run by someone who's actually run one. One retainer covers the software, the pipeline, the data, and the communications for manufacturers' representative agencies.",
  openGraph: {
    title: "RepFlow. Fractional RevOps for rep agencies.",
    description:
      "One retainer. The software, the pipeline, the data, and the communications. Run for you.",
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

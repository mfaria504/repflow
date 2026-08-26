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
  title: "RepFlow. The revenue technology partner for rep agencies.",
  description:
    "RepFlow is the revenue technology partner for manufacturers' rep agencies. We build the tools, run the stack, and solve what comes up so your reps can sell. Run by someone who's actually run an agency.",
  openGraph: {
    title: "RepFlow. The revenue technology partner for rep agencies.",
    description:
      "Build. Run. Solve. The technology behind your sales, handled, so your reps can sell.",
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

import type { Metadata } from "next";
import { Orbitron, Sora, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-display"
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-body"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-ui"
});

export const metadata: Metadata = {
  title: "KRISHNA.AI | Cognitive System Interface",
  description: "Interactive cyberpunk portfolio for Krishna Sarathe"
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${sora.variable} ${spaceGrotesk.variable} bg-bg text-textMain`}>
        {children}
      </body>
    </html>
  );
}

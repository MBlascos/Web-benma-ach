import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Benjamin Mañach | Karting Driver",
  description: "Official website of Benjamin Mañach — Spanish-British karting prodigy, WSK Super Master Series winner, FIA World Championship contender. Born Barcelona, 2011.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

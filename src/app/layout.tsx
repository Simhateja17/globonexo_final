import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Globonexo - International IT & AI Expert Hub",
  description: "At Globonexo, we empower European IT and software companies with world-class outstaffing solutions that transform challenges into opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
// @ts-ignore: side-effect import of global CSS without type declarations
import "./globals.css";
import { bentonSansPro } from "./fonts";

export const metadata: Metadata = {
  title: "Financial Fabric",
  description: "Digital Wealth and Investment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={bentonSansPro.variable}>
      <body className={`${bentonSansPro.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}

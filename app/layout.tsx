import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const source_sans_3 = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login",
  description: "Login into Handcrafted Haven or Sign Up",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${source_sans_3.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}

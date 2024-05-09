import { Source_Sans_3 } from "next/font/google";
import "./globals.css";

const source_sans_3 = Source_Sans_3({ subsets: ["latin"] });

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

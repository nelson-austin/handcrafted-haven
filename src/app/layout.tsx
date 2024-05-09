import { source_sans_3 } from "./lib/fonts";
import "./globals.css";

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

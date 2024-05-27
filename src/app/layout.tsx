"use client";

import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import store from "@/redux/store";
import { Provider } from "react-redux";

const source_sans_3 = Source_Sans_3({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body className={`${source_sans_3.className} antialiased`}>
          {children}
        </body>
      </Provider>
    </html>
  );
}
import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Logout from "./logout";

const source_sans_3 = Source_Sans_3({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Login",
  description: "Login into Handcrafted Haven or Sign Up",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={`${source_sans_3.className} antialiased`}>
        <nav>
          {!!session && <Logout />}
          {!session && <Link className="font-bold bg-green-900 text-white m-5 p-2 rounded-md hover:bg-green-300 hover:text-black" href="/login">Login</Link>}
          
        </nav>
        {children}
      </body>
    </html>
  );
}

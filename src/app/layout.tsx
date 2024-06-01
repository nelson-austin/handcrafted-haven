import NextAuth, { getServerSession } from "next-auth";
import "./globals.css";
import { NextAuthProvider, ReduxProviders } from "./provider";
import { authOptions } from "./lib/authOptions";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <NextAuthProvider session={session}>
        <ReduxProviders>{children}</ReduxProviders>
      </NextAuthProvider>
    </html>
  );
}

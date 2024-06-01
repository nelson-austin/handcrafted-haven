import { auth } from "@/auth";
import "./globals.css";
import { NextAuthProvider, ReduxProviders } from "./provider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <NextAuthProvider session={session}>
        <ReduxProviders>{children}</ReduxProviders>
      </NextAuthProvider>
    </html>
  );
}

import { auth } from "@/auth";
import "./globals.css";
import { NextAuthProvider, ReduxProviders } from "./provider";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Handcrafted Haven',
    default: 'Handcrafted Haven',
  },
  description: 'The official Handcrafted Haven Page, built with Nextjs.',
  metadataBase: new URL('https://haven-handcrafted.vercel.app/'),
};

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

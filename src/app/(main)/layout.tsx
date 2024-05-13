import type { Metadata } from "next";
import Logo from "../ui/logo";

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
    <>
        <div className="flex h-25 items-center shrink-0 bg-green-900 rounded-lg m-3 md:h-28">
            <Logo />
        </div>
        <main>
            {children}
        </main>
    </>
  );
}

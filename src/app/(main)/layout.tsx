import type { Metadata } from "next";
import { Header } from "../ui/products/addToCartButton";

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
        <div className="h-25 shrink-0 bg-green-900 rounded-lg m-3 md:h-28">
            <Header />
        </div>
        <main>
            {children}
        </main>
    </>
  );
}

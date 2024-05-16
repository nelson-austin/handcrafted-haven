// import type { Metadata } from "next";
import Header from "../ui/products/header";

// export const metadata: Metadata = {
//   title: "Login",
//   description: "Login into Handcrafted Haven or Sign Up",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

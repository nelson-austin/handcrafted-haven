"use client";

// import type { Metadata } from "next";
import Header from "../ui/products/header";
import store from "@/redux/store";
import { Provider } from "react-redux";


// export const metadata: Metadata = {
//   title: "Login",
//   description: "Login into Handcrafted Haven or Sign Up",
// };

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Provider store={store}>
        <Header />
        <main>
          {children}
        </main>
      </Provider>
    </>
  );
}
